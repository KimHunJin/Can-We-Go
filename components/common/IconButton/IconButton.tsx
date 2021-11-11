import React from "react";
import {DomProps} from "@/lib/DomProps";
import Icon from "@/components/common/Icon/Icon";
import {IconTypes} from "@/components/common/Icon/iconTypes";

interface Props extends DomProps {
    iconType: IconTypes;
}

export const IconButton: React.FC<Props> = (props) => {

    const {iconType} = props;

    return (
        <button {...DomProps.extract(props)}>
            <Icon iconType={iconType}/>
        </button>
    )
}
