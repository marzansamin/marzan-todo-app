/* eslint-disable react/prop-types */
import { Dialog, Stack, Typography, IconButton, Chip, OutlinedInput, Button, FormControlLabel, RadioGroup, Radio, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'


const AddTaskModal = ({tabName, onClose, addTask}) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState('Low');

  const handleDueDateChange = (date) => {
    setDueDate(date.toString());
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value.toString());
  };

  const handleAddTask = () => {
    if (!text.trim() || !dueDate) {
      alert('Please provide task text and due date.');
      return;
    }
    addTask(text, dueDate, priority);
    setText('');
    setDueDate(null);
    setPriority('Low');
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth='xs'>
      <Stack p={2}>
        <Stack mb={3} direction='row' alignItems='center' justifyContent='space-between'>
          <Typography variant='h6'>Add Task</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Stack>
        <Stack spacing={2}>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Typography>Status:</Typography>
            <Chip size='small' label={tabName} />
          </Stack>
          <OutlinedInput value={text} onChange={e => setText(e.target.value)} placeholder='Task' />
          <Stack spacing={2}>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography>Due Date:</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dueDate}
                  onChange={handleDueDateChange}
                  label="Due Date"
                  fullWidth
                  textField={(props) => <TextField {...props} variant="outlined" />}
                />
              </LocalizationProvider>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={3.5}>
              <Typography>Priority:</Typography>
              <RadioGroup row aria-label="priority" name="priority" value={priority} onChange={handlePriorityChange}>
                <FormControlLabel value="1" control={<Radio />} label="High" />
                <FormControlLabel value="2" control={<Radio />} label="Mid" />
                <FormControlLabel value="3" control={<Radio />} label="Low" />
              </RadioGroup>
            </Stack>
          </Stack>
          <Button onClick={handleAddTask} variant='contained'>Add Task</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default AddTaskModal