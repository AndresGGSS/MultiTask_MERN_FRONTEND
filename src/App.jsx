import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import Login from "./pages/Login"
import ToRegister from "./pages/ToRegister"
import ForgotPassword from "./pages/ForgotPassword"
import NewPassword from "./pages/NewPassword"
import ConfirmAccount from "./pages/ConfirmAccount"
import ProtectRoute from "./layouts/ProtectRoute"
import Proyects from "./pages/Proyects"
import NewProyect from "./pages/NewProyect"
import Proyect from "./pages/Proyect"
import EditProyect from "./pages/EditProyect"
import NewCollaborator from "./pages/NewCollaborator"

import { AuthProvider } from './context/AuthProvider'
import { ProyectProvider } from "./context/ProyectProvider"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="to-register" element={<ToRegister />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
              <Route path="confirm/:id" element={<ConfirmAccount />} />
            </Route>
            <Route path="/proyects" element={<ProtectRoute />}>
              <Route index element={<Proyects />} />
              <Route path="create-project" element={<NewProyect />} />
              <Route path="new-collaborator/:id" element={<NewCollaborator />} />
              <Route path=":id" element={<Proyect />} />
              <Route path="edit/:id" element={<EditProyect />} />
            </Route>
          </Routes>
          <ToastContainer />
        </ProyectProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
