import React from "react";
import styles from "./search-bar.module.scss";
import {DomProps} from "../../../lib/DomProps";

interface Props extends DomProps {
}

export const SearchBar: React.FC<Props> = (props) => {
    return (
        <input {...DomProps.extract(props, styles.searchBar)} placeholder="가고싶은 도시나 나라를 검색해보세요.">

        </input>
    )
}
