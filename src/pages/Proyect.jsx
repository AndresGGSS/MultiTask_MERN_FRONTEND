import useProyect from "../hooks/useProyect";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import ModalFormTask from "../components/ModalFormTask";
import Task from "../components/Task";
import ModalDeleteTask from "../components/ModalDeleteTask";
import Collaborators from "../components/Collaborators";
import ModalDeleteCollaborator from "../components/ModalDeleteCollaborator";
import useAdmin from "../hooks/useAdmin";
import io from "socket.io-client"

let socket;

const Proyect = () => {
  const params = useParams();
  const { getProyect, proyect, loading, deleteProyect, alert, handleModalTask, submitTaskProyect, deletedTaskProyect, editTaskProyect, changeStateProyect } = useProyect();
  const admin = useAdmin();

  useEffect(() => {
    getProyect(params.id);
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit("open proyect", params.id)
  },[])

  useEffect(() => {
    socket.on("added task", taskNew => {
      if(taskNew.proyect ===  proyect._id){
        submitTaskProyect(taskNew)
      }
    })

    socket.on('task deleted', taskDeleted => {
      if(taskDeleted.proyect === proyect._id)
      deletedTaskProyect(taskDeleted)
    })

    socket.on('updated task', taskUpdated => {
      if(taskUpdated.proyect._id === proyect._id){
        editTaskProyect(taskUpdated)
      }
    })

    socket.on('changed state', changedState => {
      if(changedState.proyect._id === proyect._id){
        changeStateProyect(changedState)
      }
    })
  })
  
  const handleClick = () => {
    if (confirm('Do you want to delete this project?')) {
      deleteProyect(params.id);
    }
  };

  const { name } = proyect;
  const { msg } = alert;


  return (
    loading ? (
      <Spinner />
    ) : (
      <>
        {msg && alert.error ? (
          <Alert alert={alert} />
        ) : (
          <div>
            <div className="flex flex-col md:flex-row justify-between">
              <h1 className="font-black text-4xl">{name}</h1>
              {admin && (
                <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
                  <div className="flex text-gray-400 hover:text-black mb-2 md:mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    <button className="uppercase font-bold" onClick={handleClick}>Delete</button>
                  </div>
                  <div className="flex text-gray-400 hover:text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                    <Link to={`/proyects/edit/${params.id}`} className="uppercase font-bold">Edit</Link>
                  </div>
                </div>
              )}
            </div>
            {msg && <Alert alert={alert} />}
            {admin && (
              <button
                onClick={handleModalTask}
                type="button"
                className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-red-600 text-white text-center mt-4 md:mt-10 flex gap-2 items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add task
              </button>
            )}
            <p className="font-bold text-xl mt-10">Project tasks</p>
            <div className="mt-10">
              {proyect?.tasks && proyect?.tasks.length > 0 ? (
                proyect?.tasks.map(task => (
                  <Task key={task._id} task={task} />
                ))
              ) : (
                <div className="bg-white shadow mt-10 rounded-lg">
                  <p className="text-center my-5 p-10 font-bold">There are no tasks in this project</p>
                </div>
              )}
            </div>
            {admin && (
              <>
                <div className="flex flex-col md:flex-row items-center justify-between mt-10">
                  <p className="font-bold text-xl md:mt-0 mt-4 mb-5">Collaborators</p>
                  <div className="flex text-gray-400 hover:text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                    <Link to={`/proyects/new-collaborator/${proyect._id}`} className="uppercase font-bold">Add</Link>
                  </div>
                </div>
                <div className="mt-4">
                  {proyect?.collaborators && proyect?.collaborators.length > 0 ? (
                    proyect?.collaborators.map(collaborator => (
                      <Collaborators key={collaborator._id} collaborator={collaborator} />
                    ))
                  ) : (
                    <div className="bg-white shadow mt-10 rounded-lg">
                      <p className="text-center my-5 p-10 font-bold">There are no collaborators in this project</p>
                    </div>
                  )}
                </div>
              </>
            )}
            <ModalDeleteTask />
            <ModalFormTask />
            <ModalDeleteCollaborator />
          </div>
        )}
      </>
    )
  )
}

export default Proyect;
