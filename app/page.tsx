"use client" 

import { HiMiniPlusCircle } from "react-icons/hi2";
import Task from "./components/task";
import {useStore} from "./store/store"
import { useState } from "react";
import ConfirmationModal from "./components/confirmationModal";
import EditModal from "./components/editModal";




export default function Home() {
  const [isConfirmationModalOpen, setConfirmationModalStatus] = useState(false);
  const [isEditModalOpen, setEditModalStatus] = useState(false);
  const [todo, setTodo] = useState<string | ''>('');
  const {Todos, addTodo, remove, update} = useStore();
  const [selectedIndex, setSelectedIndex] = useState<number | 0>(0);

  const handleAdd = () =>{
    if(!todo) return alert("Please enter a todo");
    addTodo(todo);
    setTodo('');
  }

  const handleDelete = () =>{
    debugger
    if (selectedIndex !== null) {
      remove(selectedIndex);
      setSelectedIndex(0); 
      setConfirmationModalStatus(false); 
    }
  }

  const handlePopUp = (index: number) =>{
    debugger
    setSelectedIndex(index);
    setConfirmationModalStatus(true);
  }

  const closeModal = () =>{
    setConfirmationModalStatus(false)
    setEditModalStatus(false)
  }

  const handleEditPopUp = (index: number, task: string) =>{
    debugger
    setEditModalStatus(true)
    setSelectedIndex(index);
    setTodo(task)
  }

  const confirmEditAction = (updatedTask: string) =>{
    debugger
    if (updatedTask !== null) {
      update(selectedIndex, updatedTask);
      setSelectedIndex(0); 
      setEditModalStatus(false); 
      setTodo('');
    }
  }

  const handleComplete = (index: number) =>{
    // completed(index)
  }

  return (
    <main className=" bg-no-repeat bg-cover pb-10">
      <div className="w-full text-center">
          <h1 className="text-2xl md:text-4xl lg:text-6xl pt-3 lg-pt-10 font-semibold tracking-wide text-orange-400">
              Welcome to Todo App
          </h1>

          <p className="mt-2  text-xl md:text-2xl lg:text-4xl">
            A simple yet powerful task management application
          </p>
      </div>
      <div className="flex flex-col lg:flex-row w-full mb-4 px-5 pt-6">
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-3 items-center">
          <textarea placeholder="your todo here" maxLength={320}
            className="input-field h-40 p-2" onChange={(e) => setTodo(e.target.value)}
            value={todo}  
            >

          </textarea>
          <input type="date" className="input-field h-10 p-2"  />
          <button
            onClick={handleAdd} 
            className="bg-black hover:text-black hover:bg-transparent hover:outline
             px-9 text-white rounded-full p-2 flex justify-center items-center gap-2  text-center">
              Create Task <HiMiniPlusCircle/>
          </button>
        </div>

        <div className="w-full lg:w-1/2 my-10 lg:my-6 overflow-y-scroll h-99 scroll-bar px-3">

            {Todos.map((todo:string, index:number) => (
              <Task key={index} text={todo} 
               onDelete = {() => handlePopUp(index)}
               onEdit = {() => handleEditPopUp(index, todo)}
               onComplete = {() => handleComplete(index)}
              />
            ))}
        </div>
      </div>  

        { isConfirmationModalOpen && 
          <ConfirmationModal 
            isOpen={isConfirmationModalOpen}
            handleClose = {closeModal}
            confirmAction = {handleDelete}
          />
        }


        {isEditModalOpen && 
        <EditModal
        handleClose = {closeModal}
        task ={todo}
        index = {selectedIndex}
        confirmEditAction = {confirmEditAction}
        />}
    </main>
  );
}
