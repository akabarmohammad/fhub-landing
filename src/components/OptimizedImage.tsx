import type { ImageAsset } from '../types/image'

const TRANSPARENT_PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

type OptimizedImageProps = {
  asset: ImageAsset
  className?: string
  pictureClassName?: string
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
  decorative?: boolean
}

export function OptimizedImage({
  asset,
  className,
  pictureClassName,
  loading = 'lazy',
  fetchPriority = 'auto',
  decorative = false,
}: OptimizedImageProps) {
  const sizes = asset.sizes ?? '100vw'
  const hasMobile = Boolean(asset.mobileJpeg && asset.mobileWebp)
  const alt = decorative ? '' : asset.alt
  const pictureClass = pictureClassName?.trim() || undefined

  if (asset.desktopOnly) {
    return (
      <picture className={pictureClass}>
        <source media="(min-width: 769px)" type="image/webp" srcSet={asset.webp} />
        <source media="(min-width: 769px)" srcSet={asset.jpeg} />
        <img
          src={TRANSPARENT_PIXEL}
          alt={alt}
          className={className}
          loading={loading}
          decoding="async"
          fetchPriority={fetchPriority}
          aria-hidden={decorative || undefined}
        />
      </picture>
    )
  }

  return (
    <picture className={pictureClass}>
      {hasMobile && (
        <>
          <source media="(max-width: 768px)" type="image/webp" srcSet={asset.mobileWebp} />
          <source media="(max-width: 768px)" srcSet={asset.mobileJpeg} />
        </>
      )}
      <source type="image/webp" srcSet={asset.webp} />
      <img
        src={asset.jpeg}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        sizes={sizes}
        aria-hidden={decorative || undefined}
      />
    </picture>
  )
}
