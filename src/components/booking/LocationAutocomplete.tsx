import { useEffect, useRef, useState } from 'react';
import { Loader2, MapPin, Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import { FieldLabel } from '../ui/Input';
import { routes } from '../../data/siteData';

type Suggestion = {
  label: string;
  detail: string;
  value: string;
  source: 'local' | 'photon';
};

type LocationAutocompleteProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onAcceptChange?: (accepted: boolean) => void;
  error?: string;
};

const API_ENDPOINT = 'https://photon.komoot.io/api/';

const LOCAL_PLACES: Suggestion[] = Array.from(
  new Set(routes.flatMap((route) => [route.origin, route.destination])),
)
  .sort()
  .map((name) => ({
    label: name,
    detail: 'Popular taxi route city',
    value: name,
    source: 'local' as const,
  }));

function toPhotonSuggestions(features: Array<{ properties: Record<string, string> }>): Suggestion[] {
  return features
    .filter((feature) => feature.properties.countrycode === 'IN')
    .map((feature) => {
      const p = feature.properties;
      const detail = [p.state, p.country].filter(Boolean).join(', ');
      return {
        label: p.name,
        detail,
        value: p.name,
        source: 'photon' as const,
      };
    });
}

function matchLocal(query: string): Suggestion[] {
  const needle = query.trim().toLowerCase();
  if (needle.length < 2) return [];
  const starts = LOCAL_PLACES.filter((place) => place.label.toLowerCase().startsWith(needle));
  const contains = LOCAL_PLACES.filter((place) => !starts.includes(place) && place.label.toLowerCase().includes(needle));
  return [...starts, ...contains];
}

function mergeSuggestions(local: Suggestion[], remote: Suggestion[]): Suggestion[] {
  const merged = [...local];
  const seen = new Set(merged.map((item) => item.value.toLowerCase()));
  for (const item of remote) {
    if (!seen.has(item.value.toLowerCase())) {
      merged.push(item);
      seen.add(item.value.toLowerCase());
    }
  }
  return merged;
}

export function LocationAutocomplete({ id, label, placeholder, value, onChange, onAcceptChange, error }: LocationAutocompleteProps) {
  const [text, setText] = useState(value);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [queryFailed, setQueryFailed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [accepted, setAccepted] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastLocalRef = useRef<Suggestion[]>([]);
  const requestSeqRef = useRef(0);

  const updateAccepted = (next: boolean) => {
    setAccepted(next);
    onAcceptChange?.(next);
  };

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const fetchPhoton = (query: string) => {
    const seq = ++requestSeqRef.current;
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);

    fetch(`${API_ENDPOINT}?q=${encodeURIComponent(query)}&limit=6&lang=en`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        return response.json();
      })
      .then((data: { features?: Array<{ properties: Record<string, string> }> }) => {
        if (seq !== requestSeqRef.current) return;
        const remote = toPhotonSuggestions(data.features ?? []);
        setSuggestions((current) => {
          const base = current.length > 0 ? current : lastLocalRef.current;
          return mergeSuggestions(base, remote);
        });
        setOpen(true);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        if (seq !== requestSeqRef.current) return;
        setQueryFailed(true);
      })
      .finally(() => {
        if (seq === requestSeqRef.current) setLoading(false);
      });
  };

  const handleInputChange = (input: string) => {
    setText(input);
    onChange(input);
    updateAccepted(false);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    const query = input.trim();

    if (query.length < 2) {
      setSuggestions([]);
      lastLocalRef.current = [];
      setOpen(false);
      setQueryFailed(false);
      return;
    }

    const local = matchLocal(query);
    lastLocalRef.current = local;
    setSuggestions(local);
    setQueryFailed(false);
    setActiveIndex(-1);
    setOpen(true);

    debounceRef.current = setTimeout(() => fetchPhoton(query), 300);
  };

  const selectSuggestion = (suggestion: Suggestion) => {
    setText(suggestion.label);
    onChange(suggestion.value);
    updateAccepted(true);
    setOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!open || suggestions.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % suggestions.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + suggestions.length) % suggestions.length);
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      selectSuggestion(suggestions[activeIndex]);
    } else if (event.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="space-y-1.5">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div ref={containerRef} className="relative">
        <input
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-listbox`}
          aria-activedescendant={activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
          value={text}
          onChange={(event) => handleInputChange(event.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setOpen(true);
          }}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-500 focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-slate-300" />
          ) : (
            <Search className="h-4 w-4 text-slate-300" />
          )}
        </span>

        {open && (
          <div
            id={`${id}-listbox`}
            role="listbox"
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl"
          >
            {suggestions.length === 0 ? (
              <div className="px-4 py-3.5 text-sm text-slate-500">
                {queryFailed ? 'Could not load suggestions. Type the full city name (e.g. Chennai).' : 'No matching cities found.'}
              </div>
            ) : (
              <ul className="max-h-72 overflow-y-auto py-1.5">
                {suggestions.map((suggestion, index) => (
                  <li key={`${suggestion.source}-${suggestion.value}-${index}`}>
                    <button
                      id={`${id}-option-${index}`}
                      role="option"
                      aria-selected={activeIndex === index}
                      type="button"
                      onClick={() => selectSuggestion(suggestion)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={cn(
                        'flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors',
                        activeIndex === index ? 'bg-brand-secondary/10' : 'bg-white',
                      )}
                    >
                      <MapPin
                        className={cn('mt-0.5 h-4 w-4 shrink-0', activeIndex === index ? 'text-brand-secondary' : 'text-slate-300')}
                      />
                      <span>
                        <span className="block text-sm font-semibold text-slate-900">{suggestion.label}</span>
                        {suggestion.detail && <span className="mt-0.5 block text-xs text-slate-500">{suggestion.detail}</span>}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-1.5 text-[10px] text-slate-500">
              <span>Powered by OpenStreetMap</span>
              {loading && (
                <span className="flex items-center gap-1 text-brand-secondary-text">
                  <Loader2 className="h-3 w-3 animate-spin" /> searching…
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
