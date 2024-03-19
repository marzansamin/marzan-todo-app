/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Grid, Paper, Stack, Typography, IconButton, Box } from '@mui/material'
import OpenIcon from '@mui/icons-material/Launch'
import Update from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'
import { colors } from '../../theme'
import CreateBoardModal from './CreateBoardModal'
import { useState } from'react'
import useApp from '../../hooks/useApp'
import { useNavigate } from 'react-router-dom'

const BoardCard = ({id, name, color, createdAt}) => {
  const [showModal, setshowModal] = useState(false);
  const {updateBoard, deleteBoard} = useApp();

  const handleOpenModal = () => {
    setshowModal(true);
  };

  const handleCloseModal = () => {
    setshowModal(false);
  };

  const handleUpdateBoard = async (updatedData) => {
    try {
      await updateBoard(id, updatedData); 
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteBoard = async () => {
    deleteBoard(id);
  };

  const navigate = useNavigate();

  return (
    <Grid item xs={3}>
          <Paper sx={{backgroundColor: 'transparent', backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)'}}>
            <Stack p={2} borderLeft='5px solid' borderColor={colors[color]}>
              <Stack direction='row' justifyContent='space-between' alignItems="center">
                <Box width='50%'>
                  <Typography textOverflow='ellipsis' overflow='hidden' whiteSpace='nowrap' fontWeight={400} variant='h6'>
                    {name}
                  </Typography>
                </Box>
                <IconButton onClick={() => navigate(`/boards/${id}`)} size='small'><OpenIcon /></IconButton>
              </Stack>
              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Typography variant='caption'>Created At: {createdAt}</Typography>
                <Stack direction='row'>
                  <IconButton onClick={handleOpenModal}><Update /></IconButton>
                  <IconButton color='error' onClick={handleDeleteBoard}><Delete /></IconButton>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
          {showModal && (
            <CreateBoardModal
              closeModal={handleCloseModal}
              board={{ id, name, color, createdAt }}
              handleUpdateBoard={handleUpdateBoard}
              isUpdate
            />
          )}
        </Grid>
    )
}

export default BoardCard