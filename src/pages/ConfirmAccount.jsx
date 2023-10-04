import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import Alert from "../components/Alert"
import clientAxios from "../config/clientAxios"

const ConfirmAccount = () => {

  const [alert, setAlert] = useState({})
  const [accountConfirm, setAccountConfirm] = useState(false)

  const params = useParams()
  const { id } = params

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${id}`
        const { data } = await clientAxios(url)
        setAccountConfirm(true)

      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmAccount()
  }, [])

  const { msg } = alert

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Confirm your account and start creating your
        <span className="text-red-600"> projects</span></h1>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {accountConfirm ? (
          <>
            <div className="from-sky-400 to-sky-600 bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10">User validated successfully</div>
            <Link to="/" className="block text-center my-3 text-slate-500 uppercase text-sm"> Log in </Link>
          </>
        ) : (
          <div>{msg && <Alert alert={alert} />}</div>
        )}
      </div>
    </>
  )
}

export default ConfirmAccount