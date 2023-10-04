import { useState, useEffect } from "react"
import Alert from "./Alert"
import useProyect from "../hooks/useProyect"
import { useParams } from "react-router-dom"

const Form = () => {
    const [id, setId] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [dateOfDelivery, setdateOfDelivery] = useState('')
    const [client, setclient] = useState('')

    const params = useParams()
    const { alert, submitProyect,showAlert,proyect } = useProyect()

    useEffect(() => {
        if(params.id){
            setId(proyect._id)
            setName(proyect.name)
            setDescription(proyect.description)
            setdateOfDelivery(proyect.dateOfDelivery?.split('T')[0]);
            setclient(proyect.client)
        }
    }, [params])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if ([name, description, client, dateOfDelivery].some(field => field.trim() === '')) {
            showAlert({
                msg: 'All fields are required',
                error: true
            });
            return;
        }
        await submitProyect({id, name, description, dateOfDelivery, client });
        setId(null)
        setName('');
        setDescription('');
        setdateOfDelivery('');
        setclient('');
    };
    

    const { msg } = alert

    return (
        <form onSubmit={handleSubmit} className=" bg-white py-5 px-5 md:w-1/2 rounded-lg shadow-md">
            {msg && <Alert alert={alert} />}
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="name">Name Proyect
                </label>
                <input
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    id="name"
                    placeholder="Project's name"
                    value={name}
                    onChange={e => setName(e.target.value)} />
            </div>
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="description">Description
                </label>
                <textarea
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    id="description"
                    placeholder="Project description"
                    value={description}
                    onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="date">Date of delivery
                </label>
                <input
                    type="date"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    id="date"
                    value={dateOfDelivery}
                    onChange={e => setdateOfDelivery(e.target.value)} />
            </div>
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="client">Client
                </label>
                <input
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    id="client"
                    placeholder="Customer name"
                    value={client}
                    onChange={e => setclient(e.target.value)} />
            </div>
            <input type="submit" value={params.id ? 'Update project' : 'Create project'} className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded-md cursor-pointer hover:bg-sky-800 transition-colors" />
        </form>
    )
}

export default Form