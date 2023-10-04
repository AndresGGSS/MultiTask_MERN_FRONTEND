import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import io from "socket.io-client"
import useAuth from "../hooks/useAuth";

let socket

const ProyectContext = createContext()

const ProyectProvider = ({ children }) => {

    const [proyects, setProyects] = useState([])
    const [alert, setAlert] = useState({})
    const [proyect, setProyect] = useState({})
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const [modalFormTask, setModalFormTask] = useState(false)
    const [task, setTask] = useState({})
    const [modalDeleteTask, setModalDeleteTask] = useState(false)
    const [collaborator, setCollaborator] = useState({})
    const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false)
    const [finder, setFinder] = useState(false)
    const navigate = useNavigate()
    const auth = useAuth()

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
    }, [])

    const submitTaskProyect = (task) => {
        const proyectUpdated = { ...proyect }
        proyectUpdated.tasks = [...proyectUpdated.tasks, task];
        setProyect(proyectUpdated)
    }

    const deletedTaskProyect = (task) => {
        const proyectUpdated = { ...proyect }
        proyectUpdated.tasks = proyectUpdated.tasks.filter(stateTask => stateTask._id !== task._id)
        setProyect(proyectUpdated)
    }
    
    const editTaskProyect = task => {
        const proyectUpdated = { ...proyect }
        proyectUpdated.tasks = proyectUpdated.tasks.map(taskState => taskState._id === task._id ? task : taskState)
        setProyect(proyectUpdated)
    }

    const changeStateProyect = task => {
        const proyectUpdated = {...proyect}
        proyectUpdated.tasks =  proyectUpdated.tasks.map(taskState => taskState._id === task._id ? task : taskState)
        setProyect(proyectUpdated)
    }

    const logOut = () => {
        setProyects([])
        setAlert({})
        setProyect({})
    }

    useEffect(() => {
        const getProyects = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clientAxios('/proyects', config)
                setProyects(data)

            } catch (error) {
                console.log(error)
            }
        }
        getProyects()
    }, [auth])


    const showAlert = alerta => {
        setAlert(alerta)

        setTimeout(() => {
            setAlert({})
        }, 5000);
    }

    const getProyect = async id => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clientAxios(`/proyects/${id}`, config)
            setProyect(data)
            setAlert({})
        } catch (error) {
            navigate('/proyects')
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, 3000);
        }
        setLoading(false)
    }

    const editProyect = async proyect => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.put(`/proyects/${proyect.id}`, proyect, config)

            const UpdateProyets = proyects.map(proyectState => proyectState._id === data._id ? data : proyectState)
            setProyects(UpdateProyets)
            toast.success("Project updated successfully")
            setTimeout(() => {
                setAlert({})
                navigate('/proyects')
            }, 2000);
        } catch (error) {
            console.log(error)
        }

    }

    const newProyect = async proyect => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.post('/proyects', proyect, config)

            setProyects([...proyects, data])
            toast.success("Project created successfully")

            setTimeout(() => {
                setAlert({})
                navigate('/proyects')
            }, 2000);
        } catch (error) {
            console.log(error)
        }
    }

    const submitProyect = async proyect => {
        if (proyect.id) {
            await editProyect(proyect)
        } else {
            await newProyect(proyect)
        }
    }

    const deleteProyect = async id => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.delete(`/proyects/${id}`, config)
            const updatedProyets = proyects.filter(proyectState => proyectState._id !== id)
            setProyects(updatedProyets)

            toast.success("Project deleted successfully")

            setTimeout(() => {
                setAlert({})
                navigate('/proyects')
            }, 2000);

        } catch (error) {
            console.log(error)
        }
    }

    const handleModalTask = () => {
        setModalFormTask(!modalFormTask)
        setTask({})
    }

    const submitTask = async task => {

        if (task?.id) {
            await editTask(task)
        } else {
            await createTask(task)
        }
    }

    const createTask = async task => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clientAxios.post(`/tasks`, task, config)
            setModalFormTask(false)
            socket.emit("new task",data)
        } catch (error) {
            console.log(error)
        }
    }

    const editTask = async task => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clientAxios.put(`/tasks/${task.id}`, task, config)
            setAlert({})
            setModalFormTask(false)
            socket.emit('edit task',data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTask = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clientAxios.delete(`/tasks/${task._id}`, config)

            toast.success(data.msg)
            setModalDeleteTask(false)

            socket.emit('delete task', task)
            setTask({})
        } catch (error) {
            console.log(error)
        }
    }

    const handleTask = task => {
        setTask(task)
        setModalFormTask(true)
    }

    const handleDeleteTask = task => {
        setTask(task)
        setModalDeleteTask(!modalDeleteTask)
    }

    const submitCollaborator = async email => {
        setLoading1(true)
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.post('/proyects/collaborator', { email }, config)

            setCollaborator(data)
            setAlert({})
        } catch (error) {
            toast.error(error.response.data.msg)
        } finally {
            setLoading1(false)
        }
    }

    const addCollaborator = async email => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.post(`/proyects/collaborator/${proyect._id}`, email, config)

            toast.success(data.msg)

            setCollaborator({})
            setAlert({})

        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    const handleModalDeleteCollaborators = collaborators => {
        setModalDeleteCollaborator(!modalDeleteCollaborator)
        setCollaborator(collaborators)
    }

    const deleteCollaborator = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const proyectUpdated =  {...proyect}
            proyectUpdated.collaborators =  proyectUpdated.collaborators.filter(collaboratorState =>  collaboratorState._id !== collaborator._id)
            setProyect(proyectUpdated)

            const { data } = await clientAxios.post(`/proyects/delete-collaborator/${proyect._id}`, {id: collaborator._id}, config)
            toast.success(data.msg);
            setCollaborator({})
            setModalDeleteCollaborator(false)
        } catch (error) {
            console.log(error.response)
        }
    }

    const completeTask = async id => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clientAxios.post(`/tasks/state/${id}`,{}, config)
            setTask({})
            setAlert({})
            socket.emit('change state', data)
        } catch (error) {
            console.log(error.response)
        }
    }

    const handleFinder = () => {
        setFinder(!finder)
    }
    return (
        <ProyectContext.Provider value={
            {
                proyects,
                alert,
                setAlert,
                submitProyect,
                showAlert,
                getProyect,
                proyect,
                loading,
                deleteProyect,
                handleModalTask,
                modalFormTask,
                submitTask,
                handleTask,
                task,
                handleDeleteTask,
                modalDeleteTask,
                deleteTask,
                submitCollaborator,
                collaborator,
                addCollaborator,
                loading1,
                handleModalDeleteCollaborators,
                modalDeleteCollaborator,
                deleteCollaborator,
                completeTask,
                handleFinder,
                finder,
                submitTaskProyect,
                deletedTaskProyect,
                editTaskProyect,
                changeStateProyect,
                logOut
            }
        }>{children}
        </ProyectContext.Provider>
    )
}


export { ProyectProvider }
export default ProyectContext