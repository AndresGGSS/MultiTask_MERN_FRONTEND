import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";
import clientAxios from "../config/clientAxios";

const ToRegister = () => {

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [alert, setAlert] = useState({})

    const handleSubmit = async e => {
        e.preventDefault()
        if ([name, lastName, email, password, repeatPassword].includes("")) {
            setAlert({
                msg: "All fields are required",
                error: true
            })
            return
        }

        if (password !== repeatPassword) {
            setAlert({
                msg: "Passwords are not the same",
                error: true
            })
            return
        }

        if (password.length < 6) {
            setAlert({
                msg: "The password is very short, add at least 6 characters",
                error: true
            })
            return
        }

        setAlert({})

        try {
            const fullName = `${name} ${lastName}`
            const { data } = await clientAxios.post(`/users`, {name: fullName, email, password})

            setAlert({
                msg: data.msg,
                error: false
            })

            setName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setRepeatPassword('')

        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alert


    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">Create your account and manage your
                <span className="text-red-600"> projects</span></h1>

            {msg && <Alert alert={alert} />}
            <form className="my-5 bg-white shadow-md rounded-md p-10" onSubmit={handleSubmit}>
                <div className="flex mb-5">
                    <div className="w-1/2 mr-2">
                        <label
                            htmlFor="name"
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >First Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Your name"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                            value={name}
                            onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="w-1/2 ml-2">
                        <label
                            htmlFor="lastname"
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >Last Name</label>
                        <input
                            type="text"
                            id="lastname"
                            placeholder="Your last name"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)} />
                    </div>
                </div>
                <div className="my-5">
                    <label
                        htmlFor="email"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Registration email"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="my-5">
                    <label
                        htmlFor="password"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="my-5">
                    <label
                        htmlFor="password2"
                        className="uppercase text-gray-600 block text-xl font-bold">Repeat password</label>
                    <input
                        type="password"
                        id="password2"
                        placeholder="Enter your password"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={repeatPassword}
                        onChange={e => setRepeatPassword(e.target.value)}
                    />
                </div>
                <input type="submit" value="Create Account" className="bg-red-600 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-red-900 transition-colors mb-5" />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link
                    to="/"
                    className="block text-center my-3 text-slate-500 uppercase text-sm"
                >Log in</Link>
                <Link
                    to="/forgot-password"
                    className="block text-center my-3 text-slate-500 uppercase text-sm"
                >Forgot the password?</Link>
            </nav>
        </>
    )
}

export default ToRegister;
