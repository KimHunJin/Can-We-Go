import React from "react";
import {DomProps} from "@/lib/DomProps";
import {FilterItemType} from "@/type/filterItemType";
import s from "./selector.module.scss";

interface Props extends DomProps {
    items: ReadonlyArray<FilterItemType>;
    onSelect?: (value: string | number) => void;
}

export const Selector: React.FC<Props> = ({items, ...props}) => {

    const handleItemClick = (value: string | number) => () => {
        props.onSelect?.(value);
    }

    return (
        <article {...DomProps.extract(props, s.selector)}>
            {items.map(it => (
                <section
                    key={it.value}
                    className={s.item}
                    onClick={handleItemClick(it.value)}
                >
                    {it.name}
                </section>
            ))}
        </article>
    )
}
