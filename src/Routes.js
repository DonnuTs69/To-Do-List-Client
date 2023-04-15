import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import HomePage from "./pages/Home"
import ProtectRoute from "./components/protectRoutes"

const ToDoListRoutes = () => {
  return (
    <>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectRoute>
                <HomePage />
              </ProtectRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </>
  )
}

export default ToDoListRoutes
