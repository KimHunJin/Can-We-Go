import React, {useEffect} from "react";
import {Background} from "@/components/common/Background";

export default function Layout({children}: { children: React.ReactNode }) {
    useEffect(() => {
        setTimeout(function() {
            window.scrollTo(0, 1);
        }, 0);
    }, [])
    return (
        <Background>
            <main>
                <div className='container'>
                    {children}
                </div>
            </main>
        </Background>
    )
}
