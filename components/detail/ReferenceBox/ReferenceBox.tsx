import {DomProps} from "@/lib/DomProps";
import React, { useState } from "react";
import s from "./referenceBox.module.scss";
import {TextView} from "@/components/main/TextView/TextView";
import Icon from "@/components/common/Icon/Icon";
import {IconTypes} from "@/components/common/Icon/iconTypes";

interface Props extends DomProps {
    type: string;
    reference: string;
    link?: string;
    referenceType?: 'REFERENCE' | 'TOUR'
}

export const ReferenceBox: React.FC<Props> = (
    {type, reference, link = '', referenceType = 'REFERENCE', ...props}
) => {

    const [isAbleClick] = useState(referenceType === 'TOUR' && link.length > 0);

    const handleClick = () => {
        if (!isAbleClick) {
            return;
        }

        window.open(link);
    }

    return (
        <div {...DomProps.extract(props, s.referenceBox, isAbleClick && s.hover)} onClick={handleClick}>
            <div className={s.iconWrap}>
                <Icon iconType={referenceType === 'REFERENCE' ? IconTypes.TEXT_26 : IconTypes.EARTH_26}/>
            </div>
            <article className={s.referenceMeta}>
                <TextView className={s.type}>{type}</TextView>
                <TextView className={s.reference}>{reference}</TextView>
            </article>
        </div>
    )
}
