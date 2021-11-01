import type {NextPage} from 'next'
import styles from './Home.module.scss'
import {Circle} from "../components/main/Circle/Circle";
import {SearchBar} from "../components/main/SearchBar/SearchBar";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.inputWrap}>
                <SearchBar className={styles.input}/>
            </div>
            <Circle/>
        </div>
    )
}

export default Home
