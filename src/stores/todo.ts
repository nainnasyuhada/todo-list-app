import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Todo {
  id: number;
  title: string;
  desc: string;
  status: "TO_DO" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  createdAt: Date;
  updatedAt: Date | null;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  editTodo: (id: number, updatedTodo: Partial<Todo>) => void;
  deleteTodo: (id: number) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (todo) =>
        set((state) => ({
          todos: [...state.todos, todo].sort((a, b) => {
            const statusOrder = {
              TO_DO: 0,
              IN_PROGRESS: 1,
              COMPLETED: 2,
              CANCELLED: 3,
            };
            return statusOrder[a.status] - statusOrder[b.status];
          }),
        })),

      editTodo: (id, updatedTodo) =>
        set((state) => ({
          todos: state.todos
            .map((todo) =>
              todo.id === id
                ? { ...todo, ...updatedTodo, updatedAt: new Date() }
                : todo
            )
            .sort((a, b) => {
              const statusOrder = {
                TO_DO: 0,
                IN_PROGRESS: 1,
                COMPLETED: 2,
                CANCELLED: 3,
              };
              return statusOrder[a.status] - statusOrder[b.status];
            }),
        })),

      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
    }),
    {
      name: "todo-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
