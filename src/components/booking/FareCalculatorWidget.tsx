import { useMemo, useState } from 'react';
import { ArrowRightLeft, MapPin } from 'lucide-react';
import { formatINR } from '../../lib/utils';
import { calculateFare, tripTypeOptions } from '../../lib/booking';
import type { TripType } from '../../types';
import { cabs, routes } from '../../data/siteData';
import { Select, FieldLabel } from '../ui/Input';
import { Button } from '../ui/Button';

const cityOptions = Array.from(new Set(routes.flatMap((route) => [route.origin, route.destination]))).sort();

type FareCalculatorWidgetProps = {
  onBook?: (details: { pickup: string; drop: string; cabTitle: string; tripType: TripType }) => void;
};

export function FareCalculatorWidget({ onBook }: FareCalculatorWidgetProps) {
  const [pickup, setPickup] = useState('Chennai');
  const [drop, setDrop] = useState('Coimbatore');
  const [tripType, setTripType] = useState<TripType>('One Way');
  const [cabTitle, setCabTitle] = useState(cabs[0].title);

  const result = useMemo(() => calculateFare({ pickup, drop, cabTitle, tripType }), [pickup, drop, cabTitle, tripType]);

  const cab = cabs.find((item) => item.title === cabTitle) ?? cabs[0];

  const swap = () => {
    setPickup(drop);
    setDrop(pickup);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
          <div className="space-y-1.5">
            <FieldLabel>Pickup City</FieldLabel>
            <Select value={pickup} onChange={(e) => setPickup(e.target.value)}>
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Select>
          </div>
          <button
            type="button"
            onClick={swap}
            className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:rotate-180 hover:border-brand-secondary hover:text-brand-secondary"
            aria-label="Swap cities"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </button>
          <div className="space-y-1.5">
            <FieldLabel>Drop City</FieldLabel>
            <Select value={drop} onChange={(e) => setDrop(e.target.value)}>
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <FieldLabel>Trip Type</FieldLabel>
            <Select value={tripType} onChange={(e) => setTripType(e.target.value as TripType)}>
              {tripTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-1.5">
            <FieldLabel>Cab Type</FieldLabel>
            <Select value={cabTitle} onChange={(e) => setCabTitle(e.target.value)}>
              {cabs.map((item) => (
                <option key={item.title} value={item.title}>
                  {item.title} — ₹{item.rate}/km
                </option>
              ))}
            </Select>
          </div>
        </div>

        {pickup.toLowerCase() === drop.toLowerCase() && (
          <p className="mt-3 text-xs font-medium text-red-600">Pickup and drop must be different cities.</p>
        )}
      </div>

      <div className="flex flex-col rounded-2xl border border-brand-secondary/20 bg-gradient-to-br from-brand-secondary/5 to-white p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Live Estimate</p>

        {result.found ? (
          <>
            <h3 className="mt-4 text-4xl font-bold text-slate-900">{formatINR(result.fare)}</h3>
            <p className="mt-2 text-sm font-semibold text-slate-600">
              {result.distanceKm} km • {result.tripType} • {cab.title}
            </p>
            <div className="mt-4 rounded-xl border border-slate-100 bg-white p-3.5 text-sm">
              <p className="font-bold text-slate-900">{pickup} → {drop}</p>
              <p className="mt-1 text-xs text-slate-500">
                Base {formatINR(result.baseFare)} + {result.billedDistance} km × {formatINR(result.rate)}/km
                {result.tripType === 'Round Trip' ? ' (round trip rate)' : ''}
              </p>
              {result.minimumApplied && (
                <p className="mt-1 text-[11px] font-semibold text-brand-secondary-text">
                  Minimum billing applied — billed for {result.billedDistance} km
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="mt-6 flex items-start gap-3 text-sm text-slate-500">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-secondary" />
            <p>We could not find a direct route for this pair. Try the booking form and our team will quote a custom fare.</p>
          </div>
        )}

        <p className="mt-4 text-xs leading-relaxed text-slate-500">
          Estimated rate for your selected route. Final fare may vary slightly based on traffic and route optimization.
        </p>

        <div className="mt-5">
          <Button
            variant="primary"
            size="md"
            className="w-full"
            disabled={!result.found || pickup.toLowerCase() === drop.toLowerCase()}
            onClick={() => onBook?.({ pickup, drop, cabTitle, tripType })}
            type="button"
          >
            Book This Route
          </Button>
        </div>
        {!onBook && (
          <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-500">
            Have a different route in mind? Use the booking form on this page and our team will quote a custom fare.
          </p>
        )}
      </div>
    </div>
  );
}
