import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import {Circle} from "../components/main/Circle";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Circle/>
    </div>
  )
}

export default Home
