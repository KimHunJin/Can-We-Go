import React from "react";
import s from "./circle.module.scss";
import {DomProps} from "../../../lib/DomProps";

interface Props extends DomProps {

}
export const Circle: React.FC<Props> = (props) => {
    return (
        <div {...DomProps.extract(props, s.circle)}>
            지구보오오오오온
        </div>
    )
}
