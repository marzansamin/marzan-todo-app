

/* eslint-disable react/prop-types */
import { Dialog, Stack, Typography, Chip, OutlinedInput, Button, FormControlLabel, RadioGroup, Radio, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react'
import dayjs from 'dayjs';
import ModalHeader from '../../components/layouts/ModalHeader';

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

  const today = dayjs();

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth='xs'>
      <Stack p={2}>
        <ModalHeader title="Add Task" onClose={onClose} />
        <Stack mt={3} spacing={2}>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Typography>Status:</Typography>
            <Chip size='small' label={tabName} sx={{backgroundColor: "#FAF1E4"}}/>
          </Stack>
          <OutlinedInput value={text} onChange={e => setText(e.target.value)} placeholder='Task' />
          <Stack spacing={2}>
            <Stack direction='row' alignItems='center' spacing={{xs: 0.3, sm: 2}}>
              <Typography>Due Date:</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dueDate}
                  onChange={handleDueDateChange}
                  label="Due Date"
                  fullWidth
                  minDate={today}
                  textField={(props) => <TextField {...props} variant="outlined" />}
                />
              </LocalizationProvider>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={{xs: 1, sm: 3.5}}>
              <Typography>Priority:</Typography>
              <RadioGroup row aria-label="priority" name="priority" value={priority} onChange={handlePriorityChange}>
                <Stack direction="row">
                  <FormControlLabel value="1" control={<Radio />} label="High" />
                  <FormControlLabel value="2" control={<Radio />} label="Mid" />
                  <FormControlLabel value="3" control={<Radio />} label="Low" />
                </Stack>
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
