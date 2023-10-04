import { useEffect } from "react"
import useProyect from "../hooks/useProyect"
import PreviewProyect from "../components/PreviewProyect"
import Alert from "../components/Alert"

const Proyects = () => {

    const { proyects, alert } = useProyect()
    const {msg} =  alert
    

    return (
        <>
            <h1 className="text-4xl font-black">Proyects</h1>
            {msg && <Alert alert={alert}/>}
            <div className="bg-white shadow mt-10 rounded-lg p-5">
                {proyects.length ? proyects.map(proyect => (
                    <PreviewProyect proyect={proyect} key={proyect._id} />
                )) : <p className="mt-5 text-center text-gray-600 uppercase">There are no projects to show</p>}
            </div>
        </>
    )
}

export default Proyects