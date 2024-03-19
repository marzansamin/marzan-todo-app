
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Stack, Typography, IconButton, Chip, Avatar } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import UpdateIcon from '@mui/icons-material/Edit'
import { useState, useEffect } from 'react'

const Task = ({id, text, dueDate, priority}) => {
  const [daysRemaining, setDaysRemaining] = useState(null);

  useEffect(() => {
    if (dueDate) {
      const today = new Date();
      const due = new Date(dueDate);
      const difference = due.getTime() - today.getTime();
      const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
      setDaysRemaining(days);
    }
  }, [dueDate]);

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

  return (
    <Stack direction='row' justifyItems='space-between' spacing={2}>
      <Stack p={1} border='3px solid' borderColor="#777980" bgcolor="transparent" width='100%'>
        <Typography>{text}</Typography>
        {/* <Typography>{dueDate}</Typography>
        <Typography>{priority}</Typography> */}
        <Stack direction='row' spacing={3}>
          <Chip size='small' label={daysRemaining !== null ? `${daysRemaining} Days Remaining` : 'Due Today'} sx={{backgroundColor: "#CBAACB"}} />
          <Chip size='small' label={getPriorityLabel().label} sx={{backgroundColor: getPriorityLabel().color}} />
        </Stack>
      </Stack>
      <Stack direction='row' spacing={1}>
        <IconButton size='small' ><UpdateIcon /></IconButton>
        <IconButton size='small' color='error'><DeleteIcon /></IconButton>
      </Stack>
    </Stack>
  )
}

export default Task
