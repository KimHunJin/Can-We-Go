import React from "react";
import {DomProps} from "@/lib/DomProps";
import s from "./round-filter.module.scss";
import Icon from "@/components/common/Icon/Icon";
import {IconTypes} from "@/components/common/Icon/iconTypes";
import {ContinentType} from "@/type/continentType";
import {VaccineType} from "@/type/vaccineType";
import classNames from "classnames";

interface Props extends DomProps {
    name: string;
    shortName: string;
    items: ContinentType[] | VaccineType[];
    onClick?: () => void;
}

export const RoundFilter: React.FC<Props> = (props) => {

    const {name, shortName, items} = props;

    const handleClick = () => {
        props.onClick?.();
    }

    const renderContent = () => {
        const selectedItems = items.filter(it => it.isSelect);

        if (selectedItems.length === 0) {
            return (
                <>
                <span className={s.text}>
                    {name}
                </span>
                    <Icon className={s.arrowDown} iconType={IconTypes.ARROW_DOWN_13}/>
                </>
            )
        }

        if (selectedItems.length === 1) {
            return (
                <>
                    <span className={classNames(s.text, s.select)}>
                        {selectedItems[0].name}
                    </span>
                    <Icon className={s.clear} iconType={IconTypes.CLEAR_8}/>
                </>
            )
        }

        return (
            <>
                <span className={classNames(s.text, s.select)}>
                    {shortName}
                </span>
                <span className={s.count}>
                    {selectedItems.length}
                </span>
                <Icon className={s.clear} iconType={IconTypes.CLEAR_8}/>
            </>
        )

    }

    return (
        <article {...DomProps.extract(props, s.roundFilter)} onClick={handleClick}>
            {renderContent()}
        </article>
    )
}
