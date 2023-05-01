'use client'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseapp } from "../api/firebase/firebase";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BsFillTrash3Fill } from 'react-icons/bs'
import { AddTask, db, deleteTaskDatabase, getAllTasks, q } from "../api/firebase/editDatabase";
import { collection, query } from "firebase/firestore";
import { AiOutlineEdit } from "react-icons/ai";
import EditModal from "../components/editModal";
export default function Home() {
  const [email, setEmail] = useState('')
  const [task, setTask] = useState('')
  const [nextId, setNextId] = useState(0)
  const [editedTask, setEditedTask] = useState({ task: '', taskId: '' })
  const [editModal, setEditModal] = useState(false)
  const [taskList, setTaskList] = useState([])
  const inputRef = useRef(null);
  const router = useRouter()
  const auth = getAuth(firebaseapp);

  const logOut = () => {
    signOut(auth).then(() => {
      router.push('login')
    }).catch((error) => {
      router.push('login')
    });
  }

  const updateTaskList = () => {
    setTaskList([])
    getAllTasks(auth.currentUser.uid).then((res) => {
      res.forEach(
        (item) => {
          setTaskList(tasklist => [...tasklist, {
            id: item.id,
            task: item.data().task,
          }])
          setNextId(Number(item.id) + 1)
        }
      )
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email)
        updateTaskList()
      } else {
        router.push('login')
      }
    });
  }, [])

  const sendTask = () => {
    if (task.trim() === '') {
      setTask('')
      alert('please write a task')
      return
    }
    AddTask(auth.currentUser.uid, task.trim(), String(nextId))
    updateTaskList()
    setTask('')
    inputRef.current.focus()
  }
  const deleteTask = (taskId) => {
    deleteTaskDatabase(auth.currentUser.uid, taskId)
    setTaskList(oldValues => {
      return oldValues.filter(task => task.id !== taskId)
    })
  }
  const editButton = (task, taskId) => {
    setEditedTask({
      task: task,
      id: taskId
    })
    setEditModal(true);
  }

  const editTask = (task, taskId) => {
    AddTask(auth.currentUser.uid, task, taskId)
    updateTaskList()
    
  }

  return (
    <main className="min-h-[88vh]">
      <EditModal edit={editTask} editedTask={editedTask} open={editModal} handleOpen={() => setEditModal(true)} handleClose={() => setEditModal(false)} setEditedTask={setEditedTask} />
      <div className="flex flex-col sm:flex-row justify-start items-center mt-4 sm:ml-6 gap-2 sm:gap-4">
        <button className="bg-red-600 text-dirtyWhite font-semibold rounded-lg flex justify-center items-center px-4 py-2 hover:opacity-75 cursor-pointer" onClick={logOut}>Log Out</button>
        <p className="text-xl font-semibold">{email}</p>
      </div>
      <div className="container mx-auto flex mt-12 justify-center items-center gap-2">
        <input
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendTask();
            }
          }} ref={inputRef} value={task} onChange={(e) => setTask(e.currentTarget.value)} placeholder="Write Your Task" className="bg-[#606060] focus:border-[#e3e3e3] rounded-lg px-2 border border-[#202020] h-12" />
        <button
          onClick={sendTask} className="bg-green-700 py-2 px-4 text-dirtyWhite font-semibold rounded-lg flex justify-center items-center sm:text-xl hover:opacity-75 cursor-pointer">Add Task</button>
      </div>
      <div className="sm:container w-[90%] mx-auto mt-4 flex-col-reverse text-xl gap-y-2 flex justify-center items-center">
        {taskList.map((task) => {
          return (
            <div className="flex w-full justify-between items-center sm:w-[40%] bg-[#101010] rounded-lg px-4 py-2" key={task.id}>
              <p>{task.task}</p>
              <div className="flex gap-2">
                <button onClick={() => deleteTask(task.id)} className="bg-red-600 p-2 rounded-lg">
                  <span>
                    <BsFillTrash3Fill />
                  </span>
                </button>
                <button onClick={() => { editButton(task.task, task.id) }} className="bg-blue-600 p-2 rounded-lg">
                  <span>
                    <AiOutlineEdit />
                  </span>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
