// import "preact/debug"

import type { ComponentChildren } from "preact"
import { useRef, useState, useEffect } from "preact/hooks"


export const InteractiveBox = ({children, displayname, class: className}: {children: ComponentChildren, displayname: string, class?: string}) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const [initialSize, setInitialSize] = useState<[number, number]>([0, 0])

    const Content = () => <div ref={contentRef} class="w-fit">{children}</div>


    useEffect(() => {
        let refreshSize = () => {
            if (!contentRef.current) return

            let x = contentRef.current.clientWidth
            let y = contentRef.current.clientHeight
            setInitialSize([x, y])
        }
        refreshSize()
        // let interval = setInterval(refreshSize, 50)
        // return () => clearInterval(interval)
    }, [])


    const DraggableMarkers = () => {
        const DraggableMarker = ({top, left, bottom, right}: {top?: boolean, left?: boolean, bottom?: boolean, right?: boolean}) => {
            let os = "-0.25rem"
            let st = {
                ...(top ?  {top: os} : {}),
                ...(left ? {left: os} : {}),
                ...(bottom ? {bottom: os} : {}),
                ...(right ? {right: os} : {}),

                // ...((top && left) || (bottom && right) ? {cursor: 'nwse-resize'} : {}),
                // ...((top && right) || (bottom && left) ? {cursor: 'nesw-resize'} : {}),
            }
    
            return <div
                class="border border-primary bg-white
                absolute w-2 h-2
                opacity-0 group-hover:opacity-100 transition-opacity"
                style={st}
            >
                {/* <div class="w-16 h-16 absolute -translate-x-8 -translate-y-8" /> */}
            </div>
        }    
        
        return <>
            <DraggableMarker top    left  />
            <DraggableMarker top    right />
            <DraggableMarker bottom left  />
            <DraggableMarker bottom right />
        </>
    }

    const Size = ({size}: {size: [number, number]}) => (
        <div class="absolute opacity-0 group-hover:opacity-100 transition-opacity w-full grid h-fit pointer-events-none justify-center">
            <code class="text-black bg-primary rounded-lg px-2 py-0.5 m-2 text-xs font-medium">
                <span class="opacity-50">{displayname + ' | '}</span>
                <>{size.join('x')}</>
            </code>
        </div>
    )



    return (
        <div class={"border border-transparent hover:border-primary relative group transition-colors select-none w-fit " + className}>
            <DraggableMarkers />
            <Content />
            <Size size={initialSize} />
        </div>
    )
}