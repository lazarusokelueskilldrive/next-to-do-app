import {create} from "zustand"
import { createJSONStorage, persist } from "zustand/middleware";

type TodoStore = {
  Todos: string[]; // Array of todos (strings)
  addTodo: (todo: string) => void;
  remove: (index: number) => void;
  update: (index: number, todo: string) => void;
};


export const useStore = create<TodoStore>()(
   
    persist(
        (set, get) => ({
           // state
            Todos: [],
            
            // actions
            addTodo: (todo : string) => set((state) => ({ Todos: [todo, ...state.Todos] })),
        
            remove:(index: number) => set((state) => ({
                Todos: state.Todos.filter((_: any,i: number) => i !== index)
            })),

            update: (index:number, todo: string) => set((state) => ({
                Todos: state.Todos.map((t: any,i: number) => i === index ? todo : t)
            })),

            // completed: (index: number) => set((state) => ({
            //     Todos: state.Todos.map((t:string, i:number) => i === index? )
            // }))
        }),
        {
          name: 'todos', // name of the item in the storage (must be unique)
          storage: createJSONStorage(() => localStorage),
        },
      )

   
    
);
  