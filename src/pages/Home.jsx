import { Box, IconButton, Stack, Typography } from "@mui/material"
import { axiosInstance } from "../api"
import { useEffect, useState } from "react"
import AddIcon from "@mui/icons-material/Add"
import CreateList from "../components/CreateList"

const HomePage = () => {
  const [dataUser, setDataUser] = useState({})
  const [list, setList] = useState([])
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  const getDataUser = async () => {
    try {
      const response = await axiosInstance.get("/auth/profile")

      setDataUser(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getAllList = async () => {
    try {
      const responseList = await axiosInstance.get(`list/all-list`)
      setList(responseList.data.data)

      console.log(responseList.data.data)
    } catch (err) {
      console.log(err)
    }
  }
  //   console.log(dataUser, "state")

  useEffect(() => {
    getDataUser()
  }, [])

  useEffect(() => {
    getAllList()
  }, [])
  return (
    <Box>
      <h1>{dataUser.username}</h1>
      <Typography variant="h3">All Task List</Typography>
      <IconButton onClick={handleOpenModal}>
        <AddIcon />
      </IconButton>
      <Box>
        {list.map((item) => (
          <Box
            width="fit-content"
            height="fit-content"
            border="1px solid black"
            borderRadius="10px"
            key={item.id}
          >
            <Typography variant="h4">{item.title}</Typography>
          </Box>
        ))}
      </Box>
      <CreateList open={openModal} handleClose={handleCloseModal} />
    </Box>
  )
}

export default HomePage
