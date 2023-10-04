import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useProyect from "../hooks/useProyect"

const SideBar = () => {

    const {auth, logAuth} = useAuth()
    const {logOut} = useProyect()

    const handleLogout = () => {
      logAuth()
      logOut()
      localStorage.removeItem('token')
    }

  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
        <p className="text-xl font-bold">Hello: {auth.name}</p>
        <Link to='/proyects' className='bg-red-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg'>Proyects</Link>
        <Link to='create-project' className='bg-red-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg'>New project</Link>
        <button 
                type="button"
                className="text-white text-sm bg-black p-3 rounded-md uppercase font-bold w-full mt-5"
                onClick={handleLogout}>Logout
        </button>
    </aside>
  )
}

export default SideBar