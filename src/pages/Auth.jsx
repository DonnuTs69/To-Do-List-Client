import { Box, Button, Input, TextField, Typography } from "@mui/material"
import { useCallback, useState } from "react"
import { axiosInstance } from "../api"
import { useNavigate, Link } from "react-router-dom"
import Image from "../assets/to-do-list.jpg"

const Auth = () => {
  const [usernameOrEmail, setUsernameOremail] = useState("")
  const [password, setPassword] = useState("")
  const [variant, setVariant] = useState("login")
  const navigate = useNavigate()

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    )
  })

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
            backgroundColor: "black",
            // backgroundColor: "transparent",
            opacity: "0.7",
          }}
        >
          <Typography variant="h3" gutterBottom color={"white"} sx={{ mt: 3 }}>
            Login
          </Typography>
          <form onSubmit={loginUser}>
            <Box>
              <Typography color={"white"}>Username or Email</Typography>
              <TextField
                value={usernameOrEmail}
                onChange={(e) => setUsernameOremail(e.target.value)}
                type="text"
                label="Username or Email"
              />
              <Typography color={"white"}>Password</Typography>
              <Input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Pasword"
                components={Input}
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
          <Box display={"flex"} sx={{ mt: 2, mb: 3 }}>
            <Typography color={"white"} sx={{ mr: 1 }}>
              Dont have account?
            </Typography>
            <Link to="/register">
              <Typography color={"white"}>Sign Up</Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Auth
