import React, {createRef, useEffect} from "react";
import {Background} from "@/components/common/Background";

export default function Layout({children}: { children: React.ReactNode }) {

    const ref = createRef<HTMLDivElement>();

    useEffect(() => {

        const removeEvent = (e: React.WheelEvent | React.MouseEvent | React.TouchEvent) => {
            e.preventDefault();
            e.stopPropagation();
        }

        ref.current?.addEventListener('touchmove', () => removeEvent, {passive: false});
        ref.current?.addEventListener('onclick', () => removeEvent, {passive: false});
        ref.current?.addEventListener('mousewheel', () => removeEvent, {passive: false});
    }, [])

    return (
        <Background>
            <main>
                <div className='container' ref={ref}>
                    {children}
                </div>
            </main>
        </Background>
    )
}
