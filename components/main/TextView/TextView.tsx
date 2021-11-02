import React from "react";
import {DomProps} from "../../../lib/DomProps";

interface Props extends DomProps {
}

export const TextView: React.FC<Props> = (props) => {
    return (
        <p {...DomProps.extract(props, "text-view")}>
            {props.children}
        </p>
    )
}
