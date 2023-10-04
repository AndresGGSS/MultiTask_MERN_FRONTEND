import { useState } from "react"
import Alert from "./Alert"
import useProyect from "../hooks/useProyect"

const FormCollaborator = () => {
    
    const [email, setEmail] = useState("")
    const {showAlert, alert, submitCollaborator} = useProyect()

    const handleSubmit =  e => {
        e.preventDefault()

        if(email === ""){
            showAlert({
                msg: "You must enter the email of the collaborator",
                error: true
            })
            return
        }
        submitCollaborator(email)
        setEmail("")
    }

    const {msg} = alert

    return (
        <form onSubmit={handleSubmit} className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow-md">
            {msg && <Alert alert={alert} />}
            <div className="mb-1">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="email">Collaborator email
                </label>
                <input
                    type="email"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                    id="email"
                    placeholder="Enter the collaborator's email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
            </div>
            <input type="submit" value="Search collaborator" className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded-md cursor-pointer hover:bg-sky-800 transition-colors" />
        </form>
    )
}

export default FormCollaborator