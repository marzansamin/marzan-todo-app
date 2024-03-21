/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Grid } from '@mui/material'
import BoardTab from './BoardTab'
import AddTaskModal from './AddTaskModal'
import { useCallback, useState } from 'react'
import useApp from '../../hooks/useApp'
import useStore from '../../store'
import { DragDropContext } from 'react-beautiful-dnd'
import Apploader from '../../components/layouts/AppLoader'

const statusMap = {todos: "Todos", inProgress: "In Progress", completed: "Completed", failed: "Failed"}

const BoardInterface = ({boardData, boardId, updateLastUpdated}) => {
  const [addTaskTo, setaddTaskTo] = useState("");
  const [tabs, settabs] = useState(structuredClone(boardData));
  const [loading, setloading] = useState(false);
  const {updateBoardData} = useApp();
  const {setToaster} = useStore();
 
  const handleOpenAddTaskmodal = useCallback((status) => setaddTaskTo(status), []);

  const handleAddTask = async(text, dueDate, priority) => {
    const dClone = structuredClone(tabs)
    if (!dClone[addTaskTo]) {
      dClone[addTaskTo] = []; 
    }
    dClone[addTaskTo].unshift({text, dueDate, priority, id: crypto.randomUUID()})
    try{
      setloading(true);
      await updateBoardData(boardId, dClone)
      settabs(dClone)
      setaddTaskTo('')
      updateLastUpdated();
    }catch(err){
      console.log(err);
    }finally{
      setloading(false);
    }
  }

  const handleRemoveTask = useCallback(async (tab, taskId) => {
    const dClone = structuredClone(tabs);
    const taskIdx = dClone[tab].findIndex(t => t.id===taskId)
    dClone[tab].splice(taskIdx, 1);
    setToaster("The task is deleted");
    try{
      setloading(true);
      await updateBoardData(boardId, dClone);
      settabs(dClone);
      updateLastUpdated();
    }catch(err){
      console.log(err);
    }finally{
      setloading(false);
    }
  }, [tabs]);

  const handleDnd = async ({source, destination}) => {
    if(!destination) return;
    if(source.droppableId === destination.droppableId && source.index === destination.index) return;
    const dClone = structuredClone(tabs);
    if (!dClone[source.droppableId]) {
      console.error('Source array is undefined');
      return;
    }
    if (!dClone[destination.droppableId]) {
      dClone[destination.droppableId] = [];
    }
    //remove the task from source
    const [draggedTask] = dClone[source.droppableId].splice(source.index, 1);
    //Ensure destination index is within bounds
    const destinationIndex = destination.index >= 0 ? destination.index : 0;
    //add the task to the destination
    dClone[destination.droppableId].splice(destinationIndex, 0, draggedTask);
    try{
      setloading(true);
      await updateBoardData(boardId, dClone);
      settabs(dClone);
      updateLastUpdated();
    }catch(err){
      console.log(err);
    }finally{
      setloading(false);
    }
  };

  if(loading) return <Apploader />

  return (
    <>
    {!!addTaskTo && (<AddTaskModal tabName={statusMap[addTaskTo]} onClose = {() => setaddTaskTo('')} addTask={handleAddTask} />)}
      <DragDropContext onDragEnd={handleDnd}>
        <Grid container px={4} mt={2} spacing={2} >
          {Object.keys(statusMap).map(status => (
            <BoardTab
              key={status}
              status={status} 
              tasks={tabs[status]}
              name={statusMap[status]} 
              openAddTaskModal={handleOpenAddTaskmodal} 
              removeTask={handleRemoveTask}
          />))}
        </Grid>
      </DragDropContext>
    </>
  )
}

export default BoardInterface