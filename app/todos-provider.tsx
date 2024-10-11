"use client";

import { getDb } from "@/app/db";
import { useSession } from "@clerk/nextjs";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { createContext, useEffect, useState } from "react";
import * as schema from "@/app/schema";
import { Todo } from "@/app/schema";

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
          `select * from todos where user_id = auth.user_id() order by inserted_at asc`,
        )) as Array<Todo>,
      );

      const db = drizzle(
        neon(process.env.NEXT_PUBLIC_DATABASE_AUTHENTICATED_URL!, {
          authToken,
        }),
        { schema },
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
