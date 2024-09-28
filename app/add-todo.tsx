"use client";

import { getDb } from "@/app/db";
import { useContext } from "react";
import { TodosContext } from "@/app/todos-provider";
import { useSession } from "@clerk/nextjs";

export function AddTodoForm() {
  const { todos, setTodos } = useContext(TodosContext);
  const { session } = useSession();

  if (todos === null) {
    return null;
  }

  async function insertTodoFormAction(formData: FormData) {
    const authToken = await session?.getToken();

    if (!authToken) {
      throw new Error("No auth token");
    }

    const newTodo = formData.get("newTodo");

    if (!newTodo) {
      throw new Error("No newTodo");
    }

    if (typeof newTodo !== "string") {
      throw new Error("The newTodo must be a string");
    }

    if (todos === null) {
      throw new Error("Todos is not null");
    }

    const todo = (
      (await getDb(authToken)(
        `insert into todos (task, is_complete) values($1, $2) returning *`,
        [newTodo, false],
      )) as Array<Todo>
    )[0];

    setTodos([...todos, todo]);
  }

  return (
    <form action={insertTodoFormAction}>
      <input required name="newTodo"></input>
      &nbsp;<button type="submit">Add Todo</button>
    </form>
  );
}
