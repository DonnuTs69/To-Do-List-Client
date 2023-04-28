import { Box, Button, Input, Typography } from "@mui/material"
import { useState } from "react"
import { axiosInstance } from "../api"
import { useNavigate, Link } from "react-router-dom"
import Image from "../assets/to-do-list.jpg"

const Login = () => {
  const [usernameOrEmail, setUsernameOremail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const loginUser = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.post("/auth/login", {
        usernameOrEmail: usernameOrEmail,
        password: password,
      })

      localStorage.setItem("auth_token", response.data.token)

      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${Image})`,
          position: "fixed",
          width: "100%",
          height: "auto",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100%",
        }}
      >
        <Box
          top="100px"
          display="grid"
          margin="auto"
          justifyContent="center"
          position="relative"
          sx={{
            width: "500px",
            background: "black",
            // backgroundColor: "transparent",
            opacity: "0.7",
          }}
        >
          <Typography variant="h3" gutterBottom color={"white"}>
            Login
          </Typography>
          <form onSubmit={loginUser}>
            <Box>
              <Typography color={"white"}>Username or Email</Typography>
              <Input
                value={usernameOrEmail}
                onChange={(e) => setUsernameOremail(e.target.value)}
                type="text"
              />
              <Typography color={"white"}>Password</Typography>
              <Input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Pasword"
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "195px", mt: "20px" }}
            >
              Submit
            </Button>
          </form>
          <Typography>Dont have account?</Typography>
          <Link to="/register">
            <Typography>Sign Up</Typography>
          </Link>
        </Box>
      </Box>
    </>
  )
}

export default Login
