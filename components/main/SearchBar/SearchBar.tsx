import React from "react";
import styles from "./search-bar.module.scss";
import classNames from "classnames";

interface Props {
    className?: string;
}

export const SearchBar: React.FC<Props> = (props) => {
    return (
        <input className={classNames(styles.searchBar, props?.className)} placeholder="가고싶은 도시나 나라를 검색해보세요.">

        </input>
    )
}
