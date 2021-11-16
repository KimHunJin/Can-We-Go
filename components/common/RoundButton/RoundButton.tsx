import {DomProps} from "@/lib/DomProps";
import React from "react";
import s from "./round-button.module.scss";

interface Props extends DomProps {
    clickable?: boolean;
    onClick?: () => void;
    isSelect?: boolean;
}

export const RoundButton: React.FC<Props> = ({clickable = true, isSelect = false, ...props}) => {

    const handleClick = () => {
        if (!clickable) {
            return;
        }

        props.onClick?.();
    }

    return (
        <button {...DomProps.extract(props, s.roundButton, isSelect && s.select)} onClick={handleClick}>
            {props.children}
        </button>
    )
}
