"use client" 

import { HiMiniPlusCircle } from "react-icons/hi2";
import Task from "./components/task";
import {useStore} from "./store/store"
import { useState } from "react";
import ConfirmationModal from "./components/confirmationModal";
import EditModal from "./components/editModal";

type Task = {
  task: '';
  date: '';
  status: false;
};



export default function Home() {
  const [isConfirmationModalOpen, setConfirmationModalStatus] = useState(false);
  const [isEditModalOpen, setEditModalStatus] = useState(false);
  const [todo, setTodo] = useState({
    task: '',
    date: '',
    status: false,
  });
  const {Todos, addTodo, remove, update, completed} = useStore();
  const [selectedIndex, setSelectedIndex] = useState<number | 0>(0);

  const handleAdd = () =>{
    
    if(!todo.task || !todo.date ) return alert("Please fill the form correctly");
    addTodo(todo);
    setTodo({
      task: '',
      date: '',
      status: false,
    });
  }

  const handleDelete = () =>{
    
    if (selectedIndex !== null) {
      remove(selectedIndex);
      setSelectedIndex(0); 
      setConfirmationModalStatus(false); 
    }
  }

  const handlePopUp = (index: number) =>{
    
    setSelectedIndex(index);
    setConfirmationModalStatus(true);
  }

  const closeModal = () =>{
    setConfirmationModalStatus(false)
    setEditModalStatus(false)
  }

  const handleEditPopUp = (index: number, data:any) =>{
    
    setEditModalStatus(true)
    setSelectedIndex(index);
    setTodo({
      task: data.task,
      date: data.date,
      status: false,
    });
  }

  const confirmEditAction = (updatedTask: string) =>{
    
    if (updatedTask !== null) {
      update(selectedIndex, updatedTask);
      setSelectedIndex(0); 
      setEditModalStatus(false); 
      setTodo({
        task: '',
        date: '',
        status: false,
      });
    }
  }

  const handleComplete = (index: number) =>{
    debugger
    if (index !== null) {
      completed(index)
    }
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
            className="input-field h-40 p-2" onChange={(e) => setTodo(prevState  => ({...prevState, task: e.target.value}))}
            value={todo.task} 
            >

          </textarea>
          <input type="date" className="input-field h-10 p-2"  onChange={(e) => setTodo(prevState => ({ ...prevState, date: e.target.value }))}
            value={todo.date} />
          <button
            onClick={handleAdd} 
            className="bg-black hover:text-black hover:bg-transparent hover:outline
             px-9 text-white rounded-full p-2 flex justify-center items-center gap-2  text-center">
              Create Task <HiMiniPlusCircle/>
          </button>
        </div>

        <div className="w-full lg:w-1/2 my-10 lg:my-6 overflow-y-scroll h-99 scroll-bar px-3">

            {Todos.map((todo, index:number) => (
              <Task key={index} data={todo} 
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
        data ={todo}
        index = {selectedIndex}
        confirmEditAction = {confirmEditAction}
        />}
    </main>
  );
}
