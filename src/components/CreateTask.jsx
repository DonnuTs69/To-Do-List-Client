import {
  Box,
  Button,
  FormControl,
  Icon,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import LensIcon from "@mui/icons-material/Lens"
import { useEffect, useState } from "react"
import { axiosInstance } from "../api"
import { useParams } from "react-router-dom"

const CreateTask = ({ onCreateTask }) => {
  const params = useParams()

  const [renderTask, setRenderTask] = useState({})
  const [renderStatus, setRenderStatus] = useState([])
  const [taskList, setTaskList] = useState([{ description: "", StatusId: "" }])

  const handleTaskList = () => {
    setTaskList([...taskList, { description: "" }])
  }

  const removeTaskList = (index) => {
    const list = [...taskList]

    list.splice(index, 1)
    setTaskList(list)
  }

  const handleTaskChange = (e, index) => {
    const { name, value } = e.target

    const list = [...taskList]
    list[index][name] = value
    setTaskList(list)
  }

  const getList = async () => {
    try {
      const listResponse = await axiosInstance.get(`/list/${params.id}`)
      setRenderTask(listResponse.data.data)
      //   console.log(listResponse)
    } catch (err) {
      console.log(err)
    }
  }

  const getStatus = async () => {
    try {
      const statusResponse = await axiosInstance.get("/status")

      setRenderStatus(statusResponse.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const createTask = async () => {
    try {
      const response = await axiosInstance.post(
        `/task/create/${params.id}`,
        taskList
      )
      onCreateTask()
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getList()
  }, [])

  useEffect(() => {
    getStatus()
  }, [])

  const statusColors = {
    "on Progress": "orange",
    Success: "green",
  }

  return (
    <Box
      sx={{
        margin: "auto",
        width: "fit-content",
        height: "fit-content",
        mt: "50px",
      }}
    >
      <Box
        mt="15px"
        mb="15px"
        sx={{ textAlign: "center", borderBottom: "1px solid black" }}
      >
        <Typography variant="h4">Create New Task</Typography>
      </Box>
      {taskList.map((singleTask, index) => (
        <Box key={index}>
          <Typography>Input Task</Typography>
          <Box display={"flex"} sx={{ gap: 2 }}>
            <Input
              value={singleTask.description}
              onChange={(e) => handleTaskChange(e, index)}
              name="description"
              autoFocus={true}
            />
            <FormControl sx={{ width: "180px" }}>
              <InputLabel id="status">Status</InputLabel>
              <Select
                id="status"
                label="Status"
                onChange={(e) => handleTaskChange(e, index)}
                name="StatusId"
                value={singleTask.StatusId}
              >
                {renderStatus.map((val) => (
                  <MenuItem value={val.id}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Icon
                        sx={{
                          color: statusColors[val.status],
                          mr: 1,
                        }}
                      >
                        <LensIcon />
                      </Icon>
                      {val.status}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {taskList.length > 1 && (
              <Button onClick={() => removeTaskList(index)}>remove</Button>
            )}
          </Box>
        </Box>
      ))}
      <Box
        sx={{
          margin: "auto",
          width: "fit-content",
          mt: "20px",
          display: "grid",
        }}
      >
        <IconButton onClick={() => handleTaskList()} sx={{ color: "#1976d2" }}>
          <AddCircleIcon />
        </IconButton>
        <Button
          variant="contained"
          sx={{ width: "150px" }}
          onClick={() => createTask()}
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default CreateTask
