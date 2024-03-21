
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Stack, Typography, IconButton, Chip, Dialog, DialogTitle, DialogActions, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState, useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'

const Task = ({id, text, dueDate, priority, removeTask, index}) => {
  const [daysRemaining, setDaysRemaining] = useState(null);

  useEffect(() => {
    if (dueDate) {
      const today = new Date();
      const due = new Date(dueDate);
      const difference = due.getTime() - today.getTime();
      const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
      setDaysRemaining(days);
    }
  }, [dueDate,]);

  const getPriorityLabel = () => {
    let avatar, color;
    switch(priority) {
      case "1":
        avatar="1",
        color="#FF6961"
        return { label: 'High', avatar, color };
      case "2":
        avatar="2",
        color="#8299CB"
        return { label: 'Mid', avatar, color };
      case "3":
        avatar="3",
        color="#CCE2CB"
        return { label: 'Low', avatar, color };
    }
  };

  //For opening the modal when delete button is clicked
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (<Stack {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} direction='row' justifyItems='space-between' spacing={2} sx={{boxShadow:'3', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: '6px 10px 18px rgba(0, 0, 0, 0.1)' }}}>
        <Stack p={1} bgcolor="transparent" width='100%'>
          <Typography mb={1}>{text}</Typography>
          <Stack direction='row' spacing={3}>
            <Chip size='small' label={daysRemaining !== 0 ? `${daysRemaining} Days Remaining` : 'Due Today'} sx={{backgroundColor: "#CBAACB"}} />
            <Chip size='small' label={getPriorityLabel().label} sx={{backgroundColor: getPriorityLabel().color}} />
          </Stack>
        </Stack>
        <Stack direction='row' spacing={1}>
          <IconButton size='small' onClick={handleClickOpen}><DeleteIcon /></IconButton>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete the plan?"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={removeTask} autoFocus color='error'>
                  Yes
                </Button>
                <Button onClick={handleClose}>No</Button>
              </DialogActions>
            </Dialog>
        </Stack>
      </Stack>)}
    </Draggable>
  )
}

export default Task
