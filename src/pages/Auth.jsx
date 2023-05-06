import { useCallback, useState, useContext } from "react"
import { Box, Button, Input, Typography } from "@mui/material"
import { axiosInstance } from "../api"
import { useNavigate, Link } from "react-router-dom"
import Image from "../assets/to-do-list.jpg"
import { UserContext } from "../context/userContext"
import SnackbarAlert from "../components/SnackbarAlert"

const Auth = () => {
  const [usernameOrEmail, setUsernameOremail] = useState("")
  const [usernameInput, setUsernameInput] = useState("")
  const [emaiInput, setEmaiInput] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [variant, setVariant] = useState("login")
  const [open, setOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertStatus, setAlertStatus] = useState("")

  const { setCurrentUser } = useContext(UserContext)

  const navigate = useNavigate()

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    )
  })

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  const loginUser = async () => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        usernameOrEmail: usernameOrEmail,
        password: password,
      })
      setCurrentUser(response.data.data)
      localStorage.setItem("auth_token", response.data.token)
      localStorage.setItem("current_user", JSON.stringify(response.data.data))

      navigate("/")
      setAlertMessage("Login success")
      setAlertStatus("success")
      setOpen(true)
    } catch (err) {
      console.log(err)
      setAlertMessage("Username or email not found")
      setAlertStatus("error")
      setOpen(true)
    }
  }

  const registerUser = async () => {
    try {
      if (password !== confirmPassword) {
        setAlertMessage("Password and confirm password do not match")
        setAlertStatus("error")
        setOpen(true)
      } else {
        await axiosInstance.post("/auth/register", {
          username: usernameInput,
          email: emaiInput,
          password: password,
        })

        // setVariant("login")
        setAlertMessage("User successfull created")
        setAlertStatus("success")
        setOpen(true)
        toggleVariant()
        setUsernameInput("")
        setEmaiInput("")
        setPassword("")
        setConfirmPassword("")
      }
    } catch (err) {
      console.log(err)
      setAlertMessage("Username or email already taken")
      setAlertStatus("error")
      setOpen(true)
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
            height: "fit-content",
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
            {variant === "register" && (
              <>
                <Typography color={"white"}>Confirm password</Typography>
                <Input
                  type="text"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
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
              </>
            )}
          </Box>
          <Button
            // type="submit"
            onClick={variant === "login" ? loginUser : registerUser}
            variant="contained"
            type="submit"
            sx={{ width: "350px", height: "50px", mt: 2 }}
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
        <SnackbarAlert
          open={open}
          handleClose={handleAlertClose}
          alertStatus={alertStatus}
          alertMessage={alertMessage}
        />
      </Box>
    </>
  )
}

export default Auth
