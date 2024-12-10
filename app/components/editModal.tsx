import { useState } from "react";




const EditModal = (props: any) => {

    const [editTask, setEditask] = useState({
        task: props.data.task,
        date: props.data.date,
        status: false,
    });

    const handleSave = () => {
        debugger
        props.confirmEditAction(editTask);  
    };


    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 bg-gray-900 bg-opacity-30 rounded-md shadow-lg">
                    <div className="relative transform overflow-hidden rounded-lg bg-red-600 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="">
                            <h3 className="text-base font-semibold text-gray-900" id="modal-title">Edit Task</h3>
                                <textarea placeholder="your todo here" maxLength={250}
                                    className="border-2 outline-none focus:border-black rounded-lg h-40 p-2 w-full"  
                                    value={editTask.task}
                                    onChange={(e) => setEditask(prev => ({...prev, task: e.target.value}))}
                                >
                                </textarea>
                                <input type="date" className="input-field h-10 p-2 lg:w-full" 
                                     value={editTask.date}
                                    onChange={(e) => setEditask(prev => ({...prev, date: e.target.value}))} />
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                onClick={handleSave}
                            >Update
                            </button>
                            <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                onClick={props.handleClose} >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditModal;