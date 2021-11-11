import React from "react";
import {DomProps} from "@/lib/DomProps";
import Image from "next/image";
import {IconTypes} from "@/components/common/Icon/iconTypes";

interface Props extends DomProps {
    iconType: IconTypes;
}

const Icon: React.FC<Props> = (props) => {

    const {iconType} = props;

    return (
        <Image {...DomProps.extract(props)} src={iconType}/>
    )
}

export default Icon;
