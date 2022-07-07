import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodoForm from '../components/Todo/AddTodoForm';
import TodoList from '../components/Todo/TodoList';
import TotalCompleteItems from '../components/Todo/TotalCompleteItems';
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
        <h1 className={styles.title}>My TodoList</h1>
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
