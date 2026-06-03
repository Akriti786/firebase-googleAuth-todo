// import { createContext, useContext, useState } from "react";

// const TodoContext = createContext();

// export const useTodo = () => useContext(TodoContext);

// export const TodoProvider = ({ children }) => {
//     const [todos, setTodos] = useState([]);

//     return (
//         <TodoContext.Provider
//             value={{
//                 todos,
//                 setTodos,
//             }}
//         >
//             {children}
//         </TodoContext.Provider>
//     );
// };




import { createContext, useContext, useEffect, useState } from "react";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";
import { useAuth } from "./AuthContext";

const TodoContext = createContext();

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
    const { user } = useAuth();
    const [todos, setTodos] = useState([]);

    const getTodoRef = () => {
        return collection(db, "users", user.uid, "todos");
    };

    useEffect(() => {
        if (!user) return;

        const q = query(
            getTodoRef(),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setTodos(data);
        });

        return unsubscribe;
    },[user]);

    const addTodo = async (title) => {
        if(!title.trim()) return;

        await addDoc(getTodoRef(), {
            title,
            completed:false,
            createdAt:serverTimestamp(),
        });
    };

    const deleteTodo = async(id) => {
        await deleteDoc(doc(db,"users",user.uid,"todos",id));
    };

      // TOGGLE COMPLETE
  const toggleTodo = async (id, currentStatus) => {
    await updateDoc(
      doc(db, "users", user.uid, "todos", id),
      {
        completed: !currentStatus,
      }
    );
  };

  // UPDATE TODO
  const updateTodo = async (id, newTitle) => {
    await updateDoc(
      doc(db, "users", user.uid, "todos", id),
      {
        title: newTitle,
      }
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
              deleteTodo,
              toggleTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};