import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import HomePage from "./pages/Home"
import ProtectRoute from "./components/protectRoutes"
import CreateList from "./components/CreateList"
import CreateTask from "./components/CreateTask"

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
          {/* <Route path="/list" element={<CreateList />} /> */}
          <Route path="/task/:id" element={<CreateTask />} />
        </Routes>
      </main>
    </>
  )
}

export default ToDoListRoutes
