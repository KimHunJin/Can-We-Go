import React from "react";
import {DomProps} from "../../../lib/DomProps";
import s from "./bottom-slider.module.scss";

interface Props extends DomProps {

}

export const BottomSlider: React.FC<Props> = (props) => {

    return (
        <article {...DomProps.extract(props, s.bottomSlider)}>
            {props.children}
        </article>
    )
}
