import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodoForm from '../components/AddTodoForm';
import TodoList from '../components/TodoList';
import TotalCompleteItems from '../components/TotalCompleteItems';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Redux NextJS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <h1>My TodoList</h1>
        <Link href="/Cart" >
          <a>GO TO your Cart</a>
        </Link>
        <AddTodoForm />
			  <TodoList />
		  	<TotalCompleteItems />  

      </main>

    </div>
  )
}
