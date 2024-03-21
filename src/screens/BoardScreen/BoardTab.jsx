/* eslint-disable react-refresh/only-export-components */
// Todo, inprogress, completed, failed
/* eslint-disable react/prop-types */
import { Grid, Paper, Stack, Typography, IconButton} from '@mui/material'
import AddIcon from '@mui/icons-material/AddCircleOutlineRounded'
import Task from './Task'
import { memo } from 'react'
import Droppable from '../../components/utils/StrictModeDroppable'

const BoardTab = ({name, tasks, status, openAddTaskModal, removeTask}) => {
  return (
    <Droppable droppableId={status}>
      {(provided) => (<Grid {...provided.droppableProps} ref={provided.innerRef} item xs={3}>
        <Paper sx={{backgroundColor: 'transparent', boxShadow:'3',}}>
          <Stack p={2}>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography fontWeight={400} variant='h6'>{name}</Typography>
              <IconButton onClick={() => openAddTaskModal(status)}><AddIcon fontSize='small' /></IconButton>
            </Stack>
            <Stack mt={3} spacing={2}>
            {tasks && tasks.map((task, index) => (
                <Task key={task.id} text={task.text} dueDate={task.dueDate} priority={task.priority} id={task.id} removeTask={() => removeTask(status, task.id)} index={index} />
              ))}
            </Stack>
            {provided.placeholder}
          </Stack>
        </Paper>
      </Grid>)}
    </Droppable>
  )
};

export default memo(BoardTab);
