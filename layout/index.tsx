import React, {useEffect} from "react";
import {Background} from "@/components/common/Background";

export default function Layout({children}: { children: React.ReactNode }) {
    useEffect(() => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);

        window.addEventListener("resize", () => {
            console.log("resize");
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        });

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
