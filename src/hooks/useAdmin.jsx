import useProyect from "./useProyect";
import useAuth from "./useAuth";

const useAdmin = () => {
    const {proyect} = useProyect()
    const {auth} = useAuth()

    return proyect.creator === auth._id
}

export default useAdmin