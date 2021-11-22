import React, {useEffect, useState} from "react";
import {DomProps} from "@/lib/DomProps";
import s from "./dropdown-filter.module.scss";
import {FilterItemType} from "@/type/filterItemType";
import {Selector} from "@/components/main/Overlay/Selector";

interface Props extends DomProps {
    filterItems?: ReadonlyArray<FilterItemType>
    value?: string | number | null;
    onSortItemClick?: (value: string | number) => void;
}

export const DropdownFilter: React.FC<Props> = (props) => {

    const {filterItems} = props;

    const [selectedItem, setSelectedItem] = useState<FilterItemType | null>(null)
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        if (props.value) {
            setSelectedItem(filterItems?.find(item => item.value === props.value) ?? null);
        }
    }, [props.value])

    const handleOpenerClick = () => {
        setShowOverlay(!showOverlay);
    }

    const handleSortItemClick = (value: string | number) => {
        props.onSortItemClick?.(value);
        setShowOverlay(false);
    }

    return (
        <div {...DomProps.extract(props, s.dropDownFilter)}>
            <div className={s.selectItem} onClick={handleOpenerClick}>
                {selectedItem?.name ?? ""}
                <div className={s.triangle}/>
            </div>
            {showOverlay && (
                <Selector
                    className={s.filter}
                    items={filterItems ?? []}
                    onSelect={handleSortItemClick}
                />
            )}
        </div>
    )
}
