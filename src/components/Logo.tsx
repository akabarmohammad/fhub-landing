import { images } from '../assets/images'

type LogoProps = {
  href?: string
  className?: string
  height?: number
}

export function Logo({ href = '#', className = '', height = 36 }: LogoProps) {
  return (
    <a href={href} className={`logo ${className}`.trim()}>
      <img
        src={images.logo}
        alt="FulFillHub"
        className="logo-img"
        height={height}
        decoding="async"
      />
    </a>
  )
}
