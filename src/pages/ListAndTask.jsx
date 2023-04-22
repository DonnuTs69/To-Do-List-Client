import { Box, Tab, Tabs } from "@mui/material"
import { useState } from "react"
import CreateTask from "../components/CreateTask"
import RenderListAndTask from "../components/RenderListAndTask"
import ListAltIcon from "@mui/icons-material/ListAlt"
import AddCircleIcon from "@mui/icons-material/AddCircle"

const ListAndTask = () => {
  const [value, setValue] = useState(0)

  const tabsHandleChange = (e, newValue) => {
    setValue(newValue)
  }

  const handleCreateTask = () => {
    setValue(0)
  }

  return (
    <Box>
      <Tabs value={value} onChange={tabsHandleChange} centered>
        <Tab icon={<ListAltIcon />} label="List" />
        <Tab icon={<AddCircleIcon />} label="create" />
      </Tabs>
      {value === 0 && <RenderListAndTask />}
      {value === 1 && (
        <CreateTask
        //    onCreateTask={handleCreateTask}
        />
      )}
    </Box>
  )
}

export default ListAndTask
