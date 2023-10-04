import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PreviewProyect = ({ proyect }) => {

  const auth = useAuth()
  const { name, _id, client, creator } = proyect

  return (
    <div className="border p-5 flex rounded-md mb-5 justify-between">
      <div className="flex items-center gap-2">
        <p className="flex-1">{name}</p>
        {auth.auth._id !== creator && (<p className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">Collaborator</p>)}
      </div>
      <Link to={`${_id}`} className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold">View project</Link>
    </div>
  )
}

export default PreviewProyect