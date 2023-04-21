import { Box, Icon, IconButton, Typography } from "@mui/material"
import { axiosInstance } from "../api"
import { useEffect, useState } from "react"
import AddIcon from "@mui/icons-material/Add"
import CreateList from "../components/CreateList"
import { Link } from "react-router-dom"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import Navbar from "../components/Navbar"

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
    } catch (err) {
      console.log(err)
    }
  }
  //   console.log(dataUser, "state")
  const statusColors = {
    "on Progress": "orange",
    Success: "green",
  }

  useEffect(() => {
    getDataUser()
  }, [])

  useEffect(() => {
    getAllList()
  }, [])

  console.log(list)

  return (
    <>
      <Navbar />
      <Box
        sx={{
          maxWidth: "fit-content",
          maxHeight: "fit-content",
          margin: "auto",
          mt: "50px",
        }}
      >
        <Box textAlign={"center"}>
          <Typography variant="h3">All Task List</Typography>
          <IconButton sx={{ alignItems: "center" }} onClick={handleOpenModal}>
            <AddIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            padding: "10px",
          }}
        >
          {list.map((item) => (
            <Box
              width="200px"
              height="205px"
              border="1px solid black"
              borderRadius="10px"
              key={item.id}
            >
              <Link to={`/task/${item.id}`}>
                <Typography
                  variant="h5"
                  sx={{ borderBottom: "1px solid black", textAlign: "center" }}
                >
                  {item?.title?.toUpperCase()}
                </Typography>
              </Link>
              <Box
                sx={{
                  overflow: "hidden",
                  overflowY: "scroll",
                  height: "165px",
                  scrollbarWidth: "thin",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#f1f1f1",
                    borderRadius: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#888",
                    borderRadius: "8px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "#555",
                  },
                }}
              >
                {item.Tasks.map((val) => (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    pl="5px"
                    pr="5px"
                  >
                    <Typography sx={{}}>{val.description}</Typography>
                    <Icon
                      sx={{
                        color: statusColors[val.Status.status],
                      }}
                    >
                      <FiberManualRecordIcon />
                    </Icon>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
        <CreateList open={openModal} handleClose={handleCloseModal} />
      </Box>
    </>
  )
}

export default HomePage
