import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Spinner from '../components/Spinner';

const RutaProtegida = () => {

    const { auth, loading } = useAuth();
    if(loading) return <Spinner/>
    return (
        <>
            {auth._id ?
            (<div className='bg-gray-100'>
                <Header/>
                <div className='md:flex md:min-h-screen'>
                    <SideBar/>
                    <main className='flex-1  p-10'>
                        <Outlet/>
                    </main>
                </div>
            </div>)
             : <Navigate to="/" />}
        </>
    )
}

export default RutaProtegida