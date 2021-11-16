import React from "react";
import {DomProps} from "@/lib/DomProps";
import Icon from "@/components/common/Icon/Icon";
import {IconTypes} from "@/components/common/Icon/iconTypes";
import s from "./close-button.module.scss";

interface Props extends DomProps {
    onClick?: () => void;
}

export const CloseButton: React.FC<Props> = (props) => {

    const handleClick = () => {
        props.onClick?.()
    }

    return (
        <button {...DomProps.extract(props, s.closeButton)} onClick={handleClick}>
            <Icon iconType={IconTypes.CLOSE_14}/>
        </button>
    )
}
