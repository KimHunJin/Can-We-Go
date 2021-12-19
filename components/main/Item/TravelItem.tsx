import React from "react";
import {DomProps} from "@/lib/DomProps";
import {ImageView} from "../ImageView/ImageView";
import {TextView} from "../TextView/TextView";
import {Dot} from "../../common/Dot/Dot";
import s from "./travel-item.module.scss";
import {VaccineType} from "@/type/vaccineType";

interface Props extends DomProps {
    country: string;
    continent: string;
    city: string;
    preparationCount: number;
    vaccination: VaccineType[];
    image?: string;
}

export const TravelItem: React.FC<Props> = (
    {
        country,
        continent,
        city,
        preparationCount,
        vaccination,
        image,
        ...props
    }
) => {

    const vaccineText = vaccination.length > 0 ?
        vaccination.length > 1 ? `${vaccination[0].name} 외 ${vaccination.length -1}개` : vaccination[0].name
        : '';

    return (
        <section {...DomProps.extract(props, s.travelItem)}>
            <article className={s.metaWrap}>
                <TextView className={s.country}>{country}</TextView>
                <TextView className={s.continentWithCity}>{continent}<Dot size={3}/>{city}</TextView>
                <TextView className={s.preparation}>준비해야 할 항목 {preparationCount}개</TextView>
                <TextView className={s.vaccination}>{vaccineText}</TextView>
            </article>
            <div className={s.imageWrap}>
                <ImageView className={s.mainImage} url={image}/>
            </div>
        </section>
    )
}
