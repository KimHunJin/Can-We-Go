import React from "react";
import {Background} from "@/components/common/Background";

export default function Layout({children}: { children: React.ReactNode }) {
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
