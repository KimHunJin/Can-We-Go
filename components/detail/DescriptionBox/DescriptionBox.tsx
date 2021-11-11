import React from "react";
import {DomProps} from "@/lib/DomProps";
import s from "./descriptionBox.module.scss";

interface Props extends DomProps {
    description: string;
}

export const DescriptionBox: React.FC<Props> = (props) => {

    return (
        <div {...DomProps.extract(props, s.descriptionBox)}>
            {props.description}
        </div>
    )
}
