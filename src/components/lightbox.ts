import { createContext, useContext } from 'react'

export type LightboxItem = { src: string; alt: string; pdf?: string }
export const LightboxCtx = createContext<(item: LightboxItem) => void>(() => {})

export const useLightbox = () => useContext(LightboxCtx)
