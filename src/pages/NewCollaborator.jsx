import FormCollaborator from "../components/FormCollaborator"
import { useEffect } from "react"
import useProyect from "../hooks/useProyect"
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner"
import Alert from "../components/Alert"

const NewCollaborator = () => {

    const params = useParams()
    const { getProyect, proyect, loading, collaborator, addCollaborator,loading1, alert} = useProyect()

    useEffect(() => {
        getProyect(params.id)
    }, [])

    if(!proyect?._id) return <Alert alert={alert}/>

    return (
        <>
            {loading ? <Spinner /> : (<div>
                <h1 className="text-4xl font-black">Add collaborator - Proyect: {proyect.name}</h1>
                <div className="mt-10 flex justify-center">
                    <FormCollaborator />
                </div>
                {loading1 ? <Spinner/> : collaborator?._id && (
                    <div className="flex justify-center mt-10">
                        <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-md w-full">
                            <h2 className="text-center mb-10 text-2xl font-bold">Result:</h2>
                            <div className="flex justify-between items-center">
                                <p>{collaborator.name}</p>
                                <button 
                                type="button"
                                className="bg-orange-600 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                                onClick={() => addCollaborator({
                                    email: collaborator.email
                                })}
                                >Add to project</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>)}
        </>
    )
}

export default NewCollaborator