/** Shared timing for a restrained, product-style feel */
export const easeOut = [0.25, 0.1, 0.25, 1] as const
export const easeInOutSoft = [0.45, 0, 0.55, 1] as const

export const fadeUpProps = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-12% 0px' as const, amount: 0.2 },
  transition: { duration: 0.65, ease: easeOut },
}
