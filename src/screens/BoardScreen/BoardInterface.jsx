/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Grid } from '@mui/material'
import BoardTab from './BoardTab'
import AddTaskModal from './AddTaskModal'
import { useState } from 'react'
import useApp from '../../hooks/useApp'

const statusMap = {todos: "Todos", inProgress: "In Progress", completed: "Completed", failed: "Failed"}

const BoardInterface = ({boardData, boardId}) => {
  const [addTaskTo, setaddTaskTo] = useState("");
  const [tabs, settabs] = useState(structuredClone(boardData));
  const {updateBoardData} = useApp()

  const handleAddTask = async(text, dueDate, priority) => {
    const dClone = structuredClone(tabs)
    if (!dClone[addTaskTo]) {
      dClone[addTaskTo] = []; 
    }
    dClone[addTaskTo].unshift({text, dueDate, priority, id: crypto.randomUUID()})
    try{
      await updateBoardData(boardId, dClone)
      settabs(dClone)
      setaddTaskTo('')
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
    {!!addTaskTo && (<AddTaskModal tabName={statusMap[addTaskTo]} onClose = {() => setaddTaskTo('')} addTask={handleAddTask} />)}
      <Grid container px={4} mt={2} spacing={2} >
        {Object.keys(statusMap).map(status => (
          <BoardTab
            key={status} 
            tasks={tabs[status]}
            name={statusMap[status]} 
            addTask={() => setaddTaskTo(status)} 
        />))}
      </Grid>
    </>
  )
}

export default BoardInterface