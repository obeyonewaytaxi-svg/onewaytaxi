import { useState } from 'react';
import { optimizedSrc } from '../../lib/image';

type CarImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
};

export function CarImage({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  fetchPriority = 'auto',
  sizes,
}: CarImageProps) {
  const [errored, setErrored] = useState(false);
  const displaySrc = errored ? '/images/car-placeholder.svg' : src;
  return (
    <img
      src={optimizedSrc(displaySrc, width)}
      srcSet={
        width && isWide(displaySrc)
          ? `${optimizedSrc(displaySrc, width)} 1x, ${optimizedSrc(displaySrc, width * 2)} 2x`
          : undefined
      }
      sizes={sizes}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      onError={() => setErrored(true)}
    />
  );
}

function isWide(src: string): boolean {
  return src.includes('images.ctfassets.net') || src.includes('images.unsplash.com');
}
