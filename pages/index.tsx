import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Messari Challenge
        </h1>

        <p className={styles.description}>
          Explore Assets
        </p>

        <div className={styles.grid}>
          <Link href="/asset/yfi">
            <a className={styles.card}>
              <h2>Yfi</h2>
            </a>
          </Link>

          <Link href="/asset/ethereum">
            <a className={styles.card}>
             <h2>Ethereum</h2>
            </a>
           
          </Link>

          <Link href="/asset/btc">
            <a className={styles.card}>
              <h2>Bitcoin</h2>
            </a>
          </Link>

        </div>
      </main>
    </div>
  )
}

export default Home
