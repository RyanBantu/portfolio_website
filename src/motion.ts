/** Shared timing for a restrained, product-style feel */
export const easeOut = [0.25, 0.1, 0.25, 1] as const
export const easeInOutSoft = [0.45, 0, 0.55, 1] as const

/**
 * iOS Safari: avoid strict `amount` + negative root margins — they can leave sections stuck at opacity 0.
 * Extra bottom margin triggers the reveal slightly before the section enters the viewport.
 */
export const fadeUpProps = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 'some' as const, margin: '0px 0px 25% 0px' },
  transition: { duration: 0.65, ease: easeOut },
}
