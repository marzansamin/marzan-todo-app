// Todo, inprogress, completed, failed
/* eslint-disable react/prop-types */
import { Grid, Paper, Stack, Typography, IconButton} from '@mui/material'
import AddIcon from '@mui/icons-material/AddCircleOutlineRounded'
import Task from './Task'

const BoardTab = ({name, addTask, tasks}) => {
  return (
    <Grid item xs={3}>
      <Paper sx={{backgroundColor: 'transparent', backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)', boxShadow:'3',}}>
        <Stack p={2}>
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Typography fontWeight={400} variant='h6'>{name}</Typography>
            <IconButton onClick={addTask}><AddIcon fontSize='small' /></IconButton>
          </Stack>
          <Stack mt={3} spacing={2}>
          {tasks && tasks.map(task => (
              <Task key={task.id} text={task.text} dueDate={task.dueDate} priority={task.priority} id={task.id} />
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  )
}

export default BoardTab
