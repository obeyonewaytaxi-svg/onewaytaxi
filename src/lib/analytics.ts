import { siteConfig } from '../config/site';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

const { ga4Id, clarityId } = siteConfig.analytics;

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
  if (window.gtag) {
    window.gtag('event', name, params);
  }
}
