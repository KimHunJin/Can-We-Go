import React from "react";
import s from "./dot.module.scss"
import {DomProps} from "../../../lib/DomProps";

interface Props extends DomProps {
    size: number;
}

export const Dot: React.FC<Props> = (props) => {

    return (
        <div {...DomProps.extract(props, s.dot)} style={{width: `${props.size}px`, height: `${props.size}px`}}/>
    )
}
