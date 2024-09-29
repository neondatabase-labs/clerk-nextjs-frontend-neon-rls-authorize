"use client";

import { getDb } from "@/app/db";
import { Todo, TodosContext } from "@/app/todos-provider";
import { useSession } from "@clerk/nextjs";
import { useContext, useRef } from "react";

export function AddTodoForm() {
  const { todos, setTodos } = useContext(TodosContext);
  const { session } = useSession();
  const formRef = useRef<HTMLFormElement>(null);

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
      throw new Error("Todos is null");
    }

    const todo = (
      (await getDb(authToken)(
        `insert into todos (task, is_complete) values($1, $2) returning *`,
        [newTodo, false],
      )) as Array<Todo>
    )[0];

    setTodos([...todos, todo]);
    formRef.current?.reset();
  }

  return (
    <form ref={formRef} action={insertTodoFormAction}>
      <input required name="newTodo"></input>
      &nbsp;<button type="submit">Add Todo</button>
    </form>
  );
}
