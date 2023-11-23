import Image from 'next/image'
import styles from './page.module.css'
import  NazoFrom  from '../components/NazoForm'
import Link from "next/link";
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <div><NazoFrom/></div>
      <Link href={`/main`}></Link>

      <div className={styles.grid}>
      </div>
    </main>
  )
}
