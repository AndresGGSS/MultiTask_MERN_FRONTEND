import { Link } from "react-router-dom"
import useProyect from "../hooks/useProyect"
import Search from "./Search"

const Header = () => {

  const {handleFinder,finder} = useProyect()

  return (
    <header className = 'px-4 py-5 bg-white border-b'>
        <div className="md:flex md:justify-between">
            <h2 className="text-4xl text-red-600 font-black text-center mb-5 md:mb-0">MultiTask</h2>
            <div className="flex flex-col md:flex-row items-center gap-4">
            <button 
            type="button" 
            className="font-bold uppercase md:justify-center"
            onClick={handleFinder}>Search projects</button>
            <Search/>
            </div>
            <div className="flex items-center gap-4">
            </div>
        </div>
    </header>
  )
}

export default Header