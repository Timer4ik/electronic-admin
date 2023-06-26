import { useEffect, useMemo } from "react"

export type AnyEvent = any

export const isSelectElementClick = (e: AnyEvent, className: string) =>
    e.target.className == className

export const useEffectOutsideClick = (className: string, fn: any, deps: any[]) => {
    useEffect(() => {
        
        const listener = (e: AnyEvent) => {
            if (!isSelectElementClick(e, className)) {
                
                fn()
            }
        }
        window.addEventListener("click", listener)
        return () => {
            window.removeEventListener("click", listener)
        }
    }, [deps])
}