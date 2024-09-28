import { AddTodoForm } from "@/app/add-todo";
import { Header } from "@/app/header";
import { TodoList } from "@/app/todo-list";

import { auth } from "@clerk/nextjs/server";
import styles from "../styles/Home.module.css";
import { TodosProvider } from "@/app/todos-provider";

export default async function Home() {
  const { getToken } = auth();
  const authToken = await getToken();

  let content = null;
  if (authToken) {
    content = (
      <main className={styles.main}>
        <div className={styles.container}>
          <TodosProvider>
            <AddTodoForm />
            <TodoList />
          </TodosProvider>
        </div>
      </main>
    );
  }

  return (
    <>
      <Header />
      {content}
    </>
  );
}
