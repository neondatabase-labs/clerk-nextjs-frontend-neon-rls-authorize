"use client";

import { getDb } from "@/app/db";
import { useSession } from "@clerk/nextjs";
import { createContext, useEffect, useState } from "react";

export type Todo = {
  id: string;
  user_id: string;
  task: string;
  is_complete: boolean;
  inserted_at: Date;
};

export const TodosContext = createContext<{
  todos: Array<Todo> | null;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo> | null>>;
}>({
  todos: null,
  setTodos: () => {},
});

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Array<Todo> | null>(null);

  const { session } = useSession();

  useEffect(() => {
    async function loadTodos() {
      const authToken = await session?.getToken();

      if (!authToken) {
        return;
      }

      // WHERE filter is optional because of RLS. But we send it anyway for
      // performance reasons.
      setTodos(
        (await getDb(authToken)(
          `select * from todos where user_id = auth.user_id()`,
        )) as Array<Todo>,
      );
    }

    loadTodos();
  }, [session]);

  if (session === null) {
    return null;
  }

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
}
