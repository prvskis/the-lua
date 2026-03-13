import type { ReactNode } from 'react'
import { Container } from './Container'

export function Section({
  children,
  className = '',
  containerClassName = '',
}: {
  children: ReactNode
  className?: string
  containerClassName?: string
}) {
  return (
    <section className={`py-5 sm:py-16 lg:py-15 ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}

