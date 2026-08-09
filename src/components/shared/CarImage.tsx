import { useState } from 'react';

type CarImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
};

export function CarImage({ src, alt, className, width, height, loading = 'lazy' }: CarImageProps) {
  const [errored, setErrored] = useState(false);
  return (
    <img
      src={errored ? '/images/car-placeholder.svg' : src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      onError={() => setErrored(true)}
    />
  );
}
