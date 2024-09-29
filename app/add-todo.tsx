"use client";

import { getDb } from "@/app/db";
import { Todo, TodosContext } from "@/app/todos-provider";
import { useAuth } from "@clerk/nextjs";
import { CSSProperties, useContext, useRef } from "react";

const styles = {
  form: {
    display: "flex",
    marginBottom: "20px",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    outline: "none",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
} satisfies Record<string, CSSProperties>;

export function AddTodoForm() {
  const { todos, setTodos } = useContext(TodosContext);
  const { userId, getToken } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);

  if (todos === null) {
    return null;
  }

  async function insertTodoFormAction(formData: FormData) {
    const authToken = await getToken();

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
    <form ref={formRef} action={insertTodoFormAction} style={styles.form}>
      <input
        required
        name="newTodo"
        placeholder="Enter a new todo"
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Add Todo
      </button>
    </form>
  );
}
