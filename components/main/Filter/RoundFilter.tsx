import React from "react";
import {DomProps} from "@/lib/DomProps";
import s from "./round-filter.module.scss";
import Icon from "@/components/common/Icon/Icon";
import {IconTypes} from "@/components/common/Icon/iconTypes";

interface Props extends DomProps {
    name: string;
    shortName: string;
    count: number;
    onClick?: () => void;
}

export const RoundFilter: React.FC<Props> = (props) => {

    const {name, shortName, count} = props;

    const handleClick = () => {
        props.onClick?.();
    }

    return (
        <article {...DomProps.extract(props, s.roundFilter)} onClick={handleClick}>
            <span className={s.text}>{count <= 0 ? name : shortName}</span>
            {count <= 0
                ? <Icon className={s.arrowDown} iconType={IconTypes.ARROW_DOWN_13}/>
                : (
                    <>
                        <span className={s.count}>
                            {count}
                        </span>
                        <Icon className={s.clear} iconType={IconTypes.CLEAR_8}/>
                    </>
                )
            }
        </article>
    )
}
