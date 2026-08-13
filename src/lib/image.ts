const OPTIMIZABLE_HOSTS = ['images.ctfassets.net', 'images.unsplash.com'];

function appendParams(url: string, params: Record<string, string | number>): string {
  const parsed = new URL(url);
  Object.entries(params).forEach(([key, value]) => parsed.searchParams.set(key, String(value)));
  return parsed.toString();
}

export function isOptimizable(src: string): boolean {
  try {
    return OPTIMIZABLE_HOSTS.includes(new URL(src).hostname);
  } catch {
    return false;
  }
}

export function optimizedSrc(src: string, width?: number, quality = 80): string {
  if (!isOptimizable(src)) return src;
  const params: Record<string, string | number> = { q: quality };
  if (width) params.w = width;
  try {
    if (new URL(src).hostname === 'images.ctfassets.net') params.fm = 'webp';
  } catch {}
  return appendParams(src, params);
}
