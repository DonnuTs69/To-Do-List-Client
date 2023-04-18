import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { axiosInstance } from "../api"
import { useParams } from "react-router-dom"

const CreateTask = () => {
  const params = useParams()

  const [renderTask, setRenderTask] = useState({})
  const [renderStatus, setRenderStatus] = useState([])
  const [taskList, setTaskList] = useState([{ description: "", StatusId: "" }])

  console.log(taskList)

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

  return (
    <Box>
      <Typography variant="h3">{renderTask.title}</Typography>
      <Typography>CreateTask</Typography>
      <Button onClick={() => handleTaskList()}>Add Task</Button>
      {taskList.map((singleTask, index) => (
        <Box key={index}>
          <Typography>Input Task</Typography>
          <Box display={"flex"} sx={{ gap: 2 }}>
            <Input
              value={singleTask.description}
              onChange={(e) => handleTaskChange(e, index)}
              name="description"
            />
            <FormControl sx={{ width: "150px" }}>
              <InputLabel id="status">Status</InputLabel>
              <Select
                id="status"
                label="Status"
                onChange={(e) => handleTaskChange(e, index)}
                name="StatusId"
                value={singleTask.StatusId}
              >
                {renderStatus.map((val) => (
                  <MenuItem value={val.id}>{val.status}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {taskList.length > 1 && (
              <Button onClick={() => removeTaskList(index)}>remove</Button>
            )}
          </Box>
        </Box>
      ))}
      <Button onClick={() => createTask()}>Submit</Button>
    </Box>
  )
}

export default CreateTask
