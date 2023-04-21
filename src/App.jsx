import { Box, Button, Container } from "@mui/material"
import ToDoListRoutes from "./Routes"
import Navbar from "./components/Navbar"

function App() {
  return (
    <>
      {/* <Box>
        <Button onClick={logoutBtnHandler}>LogOut</Button>
      </Box> */}
      {/* <Navbar /> */}
      <ToDoListRoutes />
    </>
  )
}

export default App
