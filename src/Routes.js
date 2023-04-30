import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import HomePage from "./pages/Home"
import ProtectRoute from "./components/protectRoutes"
import CreateList from "./components/CreateList"
import CreateTask from "./components/CreateTask"
import Navbar from "./components/Navbar"
import ListAndTask from "./pages/ListAndTask"
import Auth from "./pages/Auth"

const ToDoListRoutes = () => {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route
              index
              element={
                <ProtectRoute>
                  <HomePage />
                </ProtectRoute>
              }
            />
            {/* <Route path="/list" element={<CreateList />} /> */}
            <Route path="/task/:id" element={<ListAndTask />} />
            <Route path="/Auth" element={<Auth />} />
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default ToDoListRoutes
