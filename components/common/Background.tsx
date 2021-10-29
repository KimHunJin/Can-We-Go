import React from "react";

interface Props {

}

export const Background: React.FC<Props> = (props) => {

    return (
        <div className="background">
            {props.children}
        </div>
    )
}
