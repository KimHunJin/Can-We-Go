import React, {useEffect, useState} from "react";
import {DomProps} from "../../../lib/DomProps";
import s from "./round-filter.module.scss";

export type FilterItemType = {
    name: string;
    value: string | number;
}

interface Props extends DomProps {
    filterItems?: ReadonlyArray<FilterItemType>
    value?: string | number | null;
}

export const RoundFilter: React.FC<Props> = (props) => {

    const {filterItems} = props;

    const [selectedItem, setSelectedItem] = useState<FilterItemType | null>(null)

    useEffect(() => {
        if (props.value) {
            setSelectedItem(filterItems?.find(item => item.value === props.value) ?? null);
        }
    }, [props.value])

    return (
        <article {...DomProps.extract(props, s.roundFilter)}>
            {selectedItem?.name ?? ""}
        </article>
    )
}
