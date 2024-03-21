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
import ShiftTaskModal from './ShiftTaskModal'

export const statusMap = {todos: "Todos", inProgress: "In Progress", completed: "Completed", failed: "Failed"}

const BoardInterface = ({boardData, boardId, updateLastUpdated}) => {
  const [addTaskTo, setaddTaskTo] = useState("");
  const [tabs, settabs] = useState(structuredClone(boardData));
  const [loading, setloading] = useState(false);
  const [shiftTask, setshiftTask] = useState(null);
  const {updateBoardData} = useApp();
  const {setToaster} = useStore();
 
  const handleOpenAddTaskmodal = useCallback((status) => setaddTaskTo(status), []);

  const handleOpenShiftTaskModal = useCallback((status) => setshiftTask(status), []);

  const handleUpdateBoardData = async (dClone) => {
    setloading(true);
      await updateBoardData(boardId, dClone);
      settabs(dClone);
      updateLastUpdated();
      setToaster("Task updated")
  }

  const handleAddTask = async(text, dueDate, priority) => {
    const dClone = structuredClone(tabs)
    if (!dClone[addTaskTo]) {
      dClone[addTaskTo] = []; 
    }
    dClone[addTaskTo].unshift({text, dueDate, priority, id: crypto.randomUUID()})
    try{
      await handleUpdateBoardData(dClone);
      setaddTaskTo('');
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
      await handleUpdateBoardData(dClone);
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
    //ensure destination index is within bounds
    const destinationIndex = destination.index >= 0 ? destination.index : 0;
    //add the task to the destination
    dClone[destination.droppableId].splice(destinationIndex, 0, draggedTask);
    try{
      await handleUpdateBoardData(dClone);
    }catch(err){
      console.log(err);
    }finally{
      setloading(false);
    }
  };

  const handleShiftTask = async newStatus => {
    const oldStatus = shiftTask.status;
    if(newStatus === oldStatus) return setshiftTask(null);
    const dClone = structuredClone(tabs);
    
    const [task] = dClone[oldStatus].splice(shiftTask.index, 1);
    dClone[newStatus].unshift(task);
    try{
      await handleUpdateBoardData(dClone);
      setshiftTask(null);
    }catch(err){
      console.log(err);
    }finally{
      setloading(false);
    }
  }

  if(loading) return <Apploader />

  return (
    <>
    {!!shiftTask && <ShiftTaskModal shiftTask={handleShiftTask} task={shiftTask} onClose={() => setshiftTask(null)}/>}
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
              openShiftTaskModal={handleOpenShiftTaskModal}
              removeTask={handleRemoveTask}
          />))}
        </Grid>
      </DragDropContext>
    </>
  )
}

export default BoardInterface