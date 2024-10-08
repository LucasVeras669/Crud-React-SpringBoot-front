import { useCallback, useRef } from "react"


export const useDebounce = (delay = 300 ) => {

    const debouncing = useRef<NodeJS.Timeout>()

    const debounce = useCallback((func: ()=> void) => {
        
        if(debouncing.current) {
            clearTimeout(debouncing.current)
        }
       debouncing.current = setTimeout(() => {
            func(), delay
        }, 1000)
    }, [delay])


    return { debounce }
}