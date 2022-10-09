import { useCallback, useState, useEffect, MutableRef } from "preact/hooks"

export const useResize = (ref: MutableRef<HTMLElement | null>, defaultX: number, defaultY: number) => {
    const [isResizing, setIsResizing] = useState(false)
    const [valueX, setValueX] = useState(defaultX)
    const [valueY, setValueY] = useState(defaultY)
  
    const startResizing = useCallback((mouseDownEvent: MouseEvent) => {
        setIsResizing(true)
    }, [])
  
    const stopResizing = useCallback(() => {
        setIsResizing(false)
    }, [])
  
    const resize = useCallback(
        (mouseMoveEvent: MouseEvent) => {
            if (isResizing) {
                setValueX( old =>
                    ref.current ?
                    mouseMoveEvent.clientX -
                        ref.current.getBoundingClientRect().left : old
                )
                setValueY( old =>
                    ref.current ?
                    mouseMoveEvent.clientY -
                        ref.current.getBoundingClientRect().bottom : old
                )
            }
        },
        [isResizing]
    )
  
    useEffect(() => {
        window.addEventListener("mousemove", resize)
        window.addEventListener("mouseup", stopResizing)
        return () => {
            window.removeEventListener("mousemove", resize)
            window.removeEventListener("mouseup", stopResizing)
        }
    }, [resize, stopResizing])

    return {valueX, valueY, startResizing, isResizing}
}