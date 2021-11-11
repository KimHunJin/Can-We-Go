import React from "react";
import {DomProps} from "@/lib/DomProps";
import s from "./line.module.scss";

interface Props extends DomProps {

}

export const Line: React.FC<Props> = (props) => {

    return (
        <div {...DomProps.extract(props, s.line)}/>
    )
}
