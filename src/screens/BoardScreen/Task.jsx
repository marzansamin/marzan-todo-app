/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Stack, Typography, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import UpdateIcon from '@mui/icons-material/Edit'

const Task = ({id, text, dueDate, priority}) => {
  return (
    <Stack direction='row' justifyItems='space-between' spacing={1}>
      <Stack p={1} border='3px solid' borderColor="#777980" bgcolor="transparent" width='100%'>
        <Typography>{text}</Typography>
        <Typography>{dueDate}</Typography>
        <Typography>{priority}</Typography>
      </Stack>
      <Stack direction='row' spacing={1}>
        <IconButton size='small' ><UpdateIcon /></IconButton>
        <IconButton size='small' color='error'><DeleteIcon /></IconButton>
      </Stack>
    </Stack>
  )
}

export default Task