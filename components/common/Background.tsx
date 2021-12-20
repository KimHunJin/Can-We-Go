import React from "react";
import background from "@/assets/image/background-image.png";
import Image from "next/image";

interface Props {

}

export const Background: React.FC<Props> = (props) => {

    return (
        <div className="background">
            <div className="background-title">
                <h1>갈 수 있나?</h1>
                <h2>코로나가 저물 때 갈 수 있는<br/>여행지 아카이빙 서비스</h2>
            </div>
            {props.children}
            <div className="background-image">
                <Image src={background}/>
            </div>
        </div>
    )
}
