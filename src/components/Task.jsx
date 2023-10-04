import formatDate from "../helpers/formatDate"
import useProyect from "../hooks/useProyect"
import useAdmin from "../hooks/useAdmin"

const Task = ({ task }) => {

    const { name, description, priority, dateOfDelivery, state, _id } = task
    const { handleTask, handleDeleteTask, completeTask } = useProyect()
    const admin = useAdmin()

    return (
        <div className="border p-5 flex justify-between items-center mb-4 rounded-md shadow-md bg-white">
            <div className="flex flex-col items-start">
                <p className="mb-1 text-xl">{name}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
                <p className="mb-1 text-xl">{formatDate(dateOfDelivery)}</p>
                <p className="mb-1 text-gray-600">Priority: {priority}</p>
                {state && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completed by: {task.complete.name}</p>}
            </div>
            <div className="flex gap-2 flex-col lg:flex-row">
                {admin && <>
                    <button
                        className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                        onClick={() => handleTask(task)}
                    >Edit</button>
                    <button
                        className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                        onClick={() => handleDeleteTask(task)}
                    >Delete</button>
                </>}
                <button className = {`${state ? 'bg-green-500' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`} onClick={() => completeTask(_id)}>{state ? 'Complete' : 'Incomplete'}</button>
            </div>
        </div>
    )
}
export default Task