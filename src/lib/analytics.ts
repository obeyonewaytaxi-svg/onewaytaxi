import { siteConfig } from '../config/site';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

const { ga4Id, clarityId } = siteConfig.analytics;

// Puppeteer sets navigator.webdriver during prerender; skip analytics there
// so we never pollute GA/Clarity with bot traffic from the build step.
const isPrerender = typeof navigator !== 'undefined' && navigator.webdriver === true;

function loadScript(src: string, id: string, async = true) {
  const existing = document.getElementById(id);
  if (existing) return;
  const script = document.createElement('script');
  script.src = src;
  script.id = id;
  script.async = async;
  document.head.appendChild(script);
}

export function initAnalytics() {
  if (isPrerender) return;

  if (ga4Id) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', ga4Id, { anonymize_ip: true });
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`, 'gtag-js');
  }

  if (clarityId) {
    if (!window.clarity) {
      window.clarity = function clarity(...args: unknown[]) {
        (window.clarity as unknown as { q?: unknown[][] }).q = (window.clarity as unknown as { q?: unknown[][] }).q || [];
        (window.clarity as unknown as { q: unknown[][] }).q.push(args);
      };
    }
    loadScript(`https://www.clarity.ms/tag/${clarityId}`, 'clarity-js');
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (isPrerender) return;
  if (window.gtag) {
    window.gtag('event', name, params);
  }
  if (window.clarity) {
    window.clarity('event', name, params);
  }
}

export function pageView(path: string, title: string) {
  trackEvent('page_view', {
    page_path: path,
    page_location: `${siteConfig.domain}${path}`,
    page_title: title,
  });
}

function trackOutbound(kind: string, href: string, flow: string | undefined, linkText: string) {
  const params: Record<string, unknown> = { flow: flow || 'link', link_text: linkText, path: location.pathname };
  if (href) params.url = href;
  trackEvent(`${kind}_click`, params);
}

function handleAnchorClick(event: MouseEvent) {
  const target = event.target as Element | null;
  const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null;
  if (!anchor) return;

  const href = anchor.getAttribute('href') || '';
  const flow = anchor.getAttribute('data-flow') || undefined;
  const linkText = (anchor.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60);

  if (href.startsWith('https://wa.me/')) {
    trackOutbound('whatsapp', href, flow, linkText);
  } else if (href.startsWith('tel:')) {
    trackOutbound('call', href, flow, linkText);
  } else if (href.startsWith('mailto:')) {
    trackOutbound('mail', href, flow, linkText);
  } else {
    try {
      const resolved = new URL(href, location.href);
      if (resolved.origin !== location.origin) {
        trackOutbound('outbound', href, flow, linkText);
      }
    } catch {
      /* malformed href — ignore */
    }
  }
}

export function initDelegatedTracking() {
  if (isPrerender) return;
  document.addEventListener('click', handleAnchorClick);
}

let scrollFired = new Set<number>();
let lastScrollPath = '';

function handleScroll() {
  const path = location.pathname;
  if (path !== lastScrollPath) {
    lastScrollPath = path;
    scrollFired.clear();
  }
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  if (max <= 0) return;
  const pct = Math.round((window.scrollY / max) * 100);
  for (const depth of [25, 50, 75, 90]) {
    if (pct >= depth && !scrollFired.has(depth)) {
      scrollFired.add(depth);
      trackEvent('scroll_depth', { depth, path });
    }
  }
}

export function initScrollTracking() {
  if (isPrerender) return;
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll);
  handleScroll();
}
