/* eslint-disable react/prop-types */
import { Dialog, Stack, Typography, Chip, Button } from '@mui/material'
import ModalHeader from '../../components/layouts/ModalHeader'
import { statusMap } from './BoardInterface'
import { useState } from 'react'

const ShiftTaskModal = ({onClose, task, shiftTask}) => {
  const [taskStatus, settaskStatus] = useState(task.status)
  return (
    <Dialog open fullWidth maxWidth='sm'>
      <Stack p={1.5}>
        <ModalHeader title="Shift Task" onClose={onClose} />
        <Stack my={3} spacing={1}>
          <Stack spacing={1}>
            <Typography>Task</Typography>
            <Typography p={1.5} bgcolor="#FAF1E4">{task.text}</Typography>
          </Stack>
          <Stack spacing={1}>
            <Typography>Status</Typography>
            <Stack direction='row' spacing={0.2}> 
              {Object.entries(statusMap).map(([status, label]) => <Chip onClick={() => settaskStatus(status)} variant={taskStatus === status ? 'filled' : 'outlined'} key={status} label={label} sx={{color: "black",}} />)}
            </Stack>
          </Stack>
        </Stack>
        <Button onClick={() => shiftTask(taskStatus)} variant='contained'>Shift Task</Button>
      </Stack>
    </Dialog>
  )
}

export default ShiftTaskModal