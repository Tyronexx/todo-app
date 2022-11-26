import React, { useEffect, useState } from 'react';
import './App.css';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from './Todo';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { db } from './Firebase';
import { async } from '@firebase/util';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#1f2e2e] to-[#b3cccc]`,
  container: `bg-slate-100 max-w-[800px] w-full m-auto rounded-lg shadow-xl p-4`,
  heading: `text-4xl font-bold font-serif text-center text-gray-800 p-2`,
  form: `flex justify-between rounder-lg`,
  input: `border p-2 w-full text-xl `,
  button: `border p-4 ml-2 bg-gray-800 text-slate-100`,
  count: `text-center p-2`,

}

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');



  // CREATE TODO
  const createTodo = async (e) => {
    e.preventDefault(e)
    if (input === '') {
      alert('Please enter an item')
      return
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    })
    setInput('')       //This will reset the input back to an empty string
  };

  // READ TODO FROM FIREBASE
  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id })
      });
      setTodos(todosArr)
    })
    return () => unsubscribe()
  }, [])

  // Update todo in firebase
  // THIS IS WHEN WE NEED TO CHECK AN ITEM AS DONE
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }

  // DELETE TODO
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>My Todos</h3>

        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type='text'
            placeholder='Add Todo'
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>

        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} todo(s)`}</p>
        )}
      </div>
    </div>
  );
}

export default App;
