import useProyect from "../hooks/useProyect"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import Spinner from "../components/Spinner"
import Form from "../components/Form"

const EditProyect = () => {

    const params = useParams()
    const { getProyect, proyect, loading, deleteProyect } = useProyect()

    useEffect(() => {
        getProyect(params.id)
    }, [])

    const { name, description, } = proyect

    const handleClick = () => {
        if(confirm('Do you want to delete this project?')){
            deleteProyect(params.id)
        }
    }

    return (
        loading ? <Spinner /> : (
            <>
                <div className="flex justify-between">
                    <h1 className="font-black text-4xl">Edit proyect: {name}</h1>
                </div>
                <div className="mt-10 flex justify-center">
                    <Form />
                </div>
            </>
        )
    )
}

export default EditProyect