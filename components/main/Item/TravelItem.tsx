import React from "react";
import {DomProps} from "../../../lib/DomProps";
import s from "./travelItem.module.scss";
import {ImageView} from "../ImageView/ImageView";
import {TextView} from "../TextView/TextView";
import {Dot} from "../../common/Dot/Dot";

interface Props extends DomProps {

}

export const TravelItem: React.FC<Props> = (props) => {

    return (
        <section {...DomProps.extract(props, s.travelItem)}>
            <article className={s.metaWrap}>
                <TextView className={s.country}>싱가폴</TextView>
                <TextView className={s.continentWithCountry}>싱가폴<Dot size={3}/>싱가폴</TextView>
                <TextView className={s.startDate}>2021.12.31 부터 여행가능</TextView>
                <TextView className={s.preparation}>준비물 2개</TextView>
                <TextView className={s.vaccination}>아스트라제네카 백신 불가</TextView>
            </article>
            <div className={s.imageWrap}>
                <ImageView className={s.mainImage}/>
                <ImageView className={s.countryImage}/>
            </div>
        </section>
    )
}
