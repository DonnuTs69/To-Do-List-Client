import { useCallback, useState, useContext } from "react"
import { Box, Button, Input, TextField, Typography } from "@mui/material"
import { axiosInstance } from "../api"
import { useNavigate, Link } from "react-router-dom"
import Image from "../assets/to-do-list.jpg"
import { UserContext } from "../context/userContext"

const Auth = () => {
  const [usernameOrEmail, setUsernameOremail] = useState("")
  const [usernameInput, setUsernameInput] = useState("")
  const [emaiInput, setEmaiInput] = useState("")
  const [password, setPassword] = useState("")
  const [variant, setVariant] = useState("login")
  const { setCurrentUser, currentUser } = useContext(UserContext)
  const navigate = useNavigate()

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    )
  })

  const loginUser = async () => {
    // e.preventDefault()
    try {
      const response = await axiosInstance.post("/auth/login", {
        usernameOrEmail: usernameOrEmail,
        password: password,
      })
      setCurrentUser(response.data.data)
      localStorage.setItem("auth_token", response.data.token)
      localStorage.setItem("current_user", JSON.stringify(currentUser))

      console.log(JSON.stringify(currentUser))
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  const registerUser = async () => {
    // e.preventDefault()
    try {
      const response = await axiosInstance.post("/auth/register", {
        username: usernameInput,
        email: emaiInput,
        password: password,
      })

      console.log(response)
      loginUser()
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
          height: "100%",
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
            width: "600px",
            background: "black",
            height: "500px",
            // backgroundColor: "transparent",
            opacity: "0.7",
            borderRadius: "5px",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            color={"white"}
            sx={{ mt: 3, textAlign: "center" }}
          >
            {variant === "login" ? "Sign in" : "Register"}
          </Typography>
          <Box>
            {variant === "login" && (
              <>
                <Typography color={"white"}>Username or Email</Typography>
                <Input
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOremail(e.target.value)}
                  type="text"
                  placeholder="Username or Email"
                  sx={{
                    fontSize: "16px",
                    fontFamily: "inherit",
                    padding: "0.25em 0.5em",
                    backgroundColor: "#fff",
                    border: "2px solid white",
                    borderRadius: "4px",
                    width: "350px",
                    height: "50px",
                    mb: 2,
                  }}
                />
              </>
            )}

            {variant === "register" && (
              <>
                <Typography color={"white"}>Username</Typography>
                <Input
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  type="text"
                  placeholder="Username"
                  sx={{
                    fontSize: "16px",
                    fontFamily: "inherit",
                    padding: "0.25em 0.5em",
                    backgroundColor: "#fff",
                    border: "2px solid white",
                    borderRadius: "4px",
                    width: "350px",
                    height: "50px",
                    mb: 2,
                  }}
                />
                <Typography color={"white"}>Email</Typography>
                <Input
                  value={emaiInput}
                  onChange={(e) => setEmaiInput(e.target.value)}
                  type="text"
                  placeholder="Email"
                  sx={{
                    fontSize: "16px",
                    fontFamily: "inherit",
                    padding: "0.25em 0.5em",
                    backgroundColor: "#fff",
                    border: "2px solid white",
                    borderRadius: "4px",
                    width: "350px",
                    height: "50px",
                    mb: 2,
                  }}
                />
              </>
            )}
            <Typography color={"white"}>Password</Typography>
            <Input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Pasword"
              components={Input}
              sx={{
                fontSize: "16px",
                fontFamily: "inherit",
                padding: "0.25em 0.5em",
                backgroundColor: "#fff",
                border: "2px solid white",
                borderRadius: "4px",
                width: "350px",
                height: "50px",
                mb: 1,
              }}
            />
          </Box>
          <Button
            // type="submit"
            onClick={variant === "login" ? loginUser : registerUser}
            variant="contained"
            sx={{ width: "350px", height: "50px" }}
          >
            {variant === "login" ? "Login" : "Sign up"}
          </Button>
          <Box display={"flex"} sx={{ mt: 1, mb: 3 }}>
            <Typography color={"white"} variant="h6" sx={{ mr: 1 }}>
              {variant === "login"
                ? "Dont have account?"
                : "Already have an account?"}
            </Typography>
            <Link onClick={toggleVariant}>
              <Typography color={"white"} variant="h6">
                {variant === "login" ? "Create an account" : "Login"}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Auth
