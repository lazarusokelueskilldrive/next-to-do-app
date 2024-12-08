import { AiOutlineDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";




const Task = (props: any) => {
 

    return (
        <div className="task-card">
          <div className="w-4/5">
            {props.text}
            <br/>
            <span className="pt-3"> <span className="font-bold">End date:</span>  02/23/2024</span>
          </div>
          <div className="flex justify-evenly w-1/3 text-2xl">
            <AiOutlineCheck className="text-green-600 cursor-pointer font-bold" onClick={props.onComplete}/>
            <AiOutlineDelete style={{ strokeLinecap: 'round' }} className="text-red-500 cursor-pointer" onClick={props.onDelete}/>
            <AiFillEdit className="text-blue-600 cursor-pointer" onClick={props.onEdit}/>
          </div>
        </div>
    )
}

export default Task;