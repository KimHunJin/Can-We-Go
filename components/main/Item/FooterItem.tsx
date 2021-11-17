import React from "react";
import {DomProps} from "@/lib/DomProps";
import s from "./footer-item.module.scss";
import {IconTypes} from "@/components/common/Icon/iconTypes";
import Icon from "@/components/common/Icon/Icon";
import {TextView} from "@/components/main/TextView/TextView";
import classNames from "classnames";

interface Props extends DomProps {
    text: string;
    iconType: IconTypes;
    iconHoverType: IconTypes;
    isSelect: boolean;
    onClick?: () => void;
}

export const FooterItem: React.FC<Props> = ({text, isSelect, iconType, iconHoverType, ...props}) => {

    const handleClick = () => {
        props.onClick?.();
    }

    return (
        <div {...DomProps.extract(props, s.footerItem)} onClick={handleClick}>
            <Icon iconType={isSelect ? iconHoverType : iconType}/>
            <TextView className={classNames(s.text, isSelect && s.select)}>{text}</TextView>
        </div>
    )
}
