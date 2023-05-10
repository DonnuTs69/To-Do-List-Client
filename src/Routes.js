import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/Home"
import ProtectRoute from "./components/protectRoutes"
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
                // <ProtectRoute>
                // </ProtectRoute>
                <HomePage />
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
