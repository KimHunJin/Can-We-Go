import React from "react";
import {DomProps} from "../../../lib/DomProps";
import s from "./image-view.module.scss";

interface Props extends DomProps {
    url?: string;
}

export const ImageView: React.FC<Props> = (props) => {
    return (
        <img {...DomProps.extract(props, s.imageView)} src={props.url}/>
    )
}
