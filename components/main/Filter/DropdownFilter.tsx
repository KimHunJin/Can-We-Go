import React, {useEffect, useState} from "react";
import {DomProps} from "../../../lib/DomProps";
import s from "./dropdown-filter.module.scss";
import {FilterItemType} from "./RoundFilter";

interface Props extends DomProps {
    filterItems?: ReadonlyArray<FilterItemType>
    value?: string | number | null;
}

export const DropdownFilter: React.FC<Props> = (props) => {

    const {filterItems} = props;

    const [selectedItem, setSelectedItem] = useState<FilterItemType | null>(null)

    useEffect(() => {
        if (props.value) {
            setSelectedItem(filterItems?.find(item => item.value === props.value) ?? null);
        }
    }, [props.value])

    return (
        <div {...DomProps.extract(props, s.dropDownFilter)}>
            {selectedItem?.name ?? ""}
            <div className={s.triangle}/>
        </div>
    )
}
