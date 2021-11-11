import React from "react";
import {DomProps} from "@/lib/DomProps";
import s from "./infoBox.module.scss";
import {TextView} from "@/components/main/TextView/TextView";
import {DescriptionBox} from "@/components/detail/DescriptionBox/DescriptionBox";

interface Props extends DomProps {
    infoTitle: string;
    descriptions?: ReadonlyArray<string>;
}

export const InfoBox: React.FC<Props> = (props) => {

    const {infoTitle, descriptions} = props;

    return (
        <article {...DomProps.extract(props, s.infoBox)}>
            <TextView className={s.infoHeader}>
                {infoTitle}
            </TextView>
            <section className={s.descriptions}>
                {descriptions?.map((d, index) => (
                    <DescriptionBox className={s.description} key={index} description={d}/>
                ))}
            </section>
        </article>
    )
}
