import { Link } from "react-router-dom"
import { useState } from "react"
import Alert from "../components/Alert"
import clientAxios from "../config/clientAxios"

const ForgotPassword = () => {

  const [email, setEmail] = useState("")
  const [alert, setAlert] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    if(email === "" || email.length < 6){
      setAlert({
        msg:"Email is required",
        error: true
      })
      return
    }

    try {
      const { data } = await clientAxios.post(`/users/forgot-password`,{email})

      setAlert({
        msg: data.msg,
        error: false
      })
      setEmail("")

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alert

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Recover your access and don't lose your
        <span className="text-red-600"> projects</span></h1>
      {msg && <Alert alert={alert}/>}
      <form onSubmit={handleSubmit} className="my-5 bg-white shadow-md rounded-md p-10">
        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
          <input 
          type="email" 
          id="email" 
          placeholder="Registration email" 
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
          value={email}
          onChange={e => setEmail(e.target.value)}/>
        </div>
        <input type="submit" value="Send instructions" className="bg-red-600 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-red-900 transition-colors mb-5" />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-3 text-slate-500 uppercase text-sm"
        >Log in</Link>
        <Link
          to="/to-register"
          className="block text-center my-3 text-slate-500 uppercase text-sm"
        >Create an account</Link>
      </nav>
    </>
  )
}

export default ForgotPassword