type ImageFrameProps = {
  src: string
  alt: string
  ratio?: string
  fit?: 'cover' | 'contain'
  className?: string
  imageClassName?: string
}

export function ImageFrame({
  src,
  alt,
  ratio,
  fit = 'cover',
  className = '',
  imageClassName = '',
}: ImageFrameProps) {
  return (
    <div className={['relative overflow-hidden', ratio ?? '', className].join(' ')}>
      <img
        src={src}
        alt={alt}
        className={[
          'absolute inset-0 h-full w-full',
          fit === 'cover' ? 'object-cover' : 'object-contain',
          imageClassName,
        ].join(' ')}
      />
    </div>
  )
}
