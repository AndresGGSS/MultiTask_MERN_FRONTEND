import { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import Alert from "../components/Alert"
import clientAxios from "../config/clientAxios"

const NewPassword = () => {

  const params = useParams()
  const { token } = params

  const [validToken, setValidToken] = useState(false)
  const [alert, setAlert] = useState({})
  const [password, setPassword] = useState('')
  const [passwordModified, setPasswordModified] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    if (password.length < 6) {
      setAlert({
        msg: 'The password must have more than 6 characters',
        error: true
      })
      return
    }

    try {
      const url = `users/forgot-password/${token}`
      const { data } = await clientAxios.post(url, { password })
      console.log(data)
      setAlert({
        msg: data.msg,
        error: false
      })
      setPasswordModified(true)
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  useEffect(() => {
    const checkToken = async () => {
      try {
        await clientAxios(`/users/forgot-password/${token}`)
        setValidToken(true)
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    checkToken()
  }, [])

  const { msg } = alert

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Reset your password and don't lose your
        <span className="text-red-600"> projects</span></h1>
      {msg && <Alert alert={alert} />}

      {validToken && (
        <form onSubmit={handleSubmit} className="my-5 bg-white shadow-md rounded-md p-10">
          <div className="my-5">
            <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">New Password</label>
            <input
              type="password"
              id="password"
              placeholder="Type your new password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={e => setPassword(e.target.value)} />
          </div>
          <input type="submit" value="Create new password" className="bg-red-600 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-red-900 transition-colors mb-5" />
        </form>
      )}

      {passwordModified && (
        <Link
          to="/"
          className="block text-center my-3 text-slate-500 uppercase text-sm"
        >Log in</Link>
      )}
    </>
  )
}

export default NewPassword