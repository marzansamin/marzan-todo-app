/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Grid, Paper, Stack, Typography, IconButton, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material'
import OpenIcon from '@mui/icons-material/Launch'
import Update from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'
import { colors } from '../../theme'
import CreateBoardModal from './CreateBoardModal'
import { useState } from'react'
import useApp from '../../hooks/useApp'
import { useNavigate } from 'react-router-dom'
import useStore from '../../store'

const BoardCard = ({id, name, color, createdAt}) => {
  const [showModal, setshowModal] = useState(false);
  const {updateBoard, deleteBoard} = useApp();
  const {setToaster} = useStore();

  const handleOpenModal = () => {
    setshowModal(true);
  };

  const handleCloseModal = () => {
    setshowModal(false);
  };

  const handleUpdateBoard = async (updatedData) => {
    try {
      await updateBoard(id, updatedData);
      setToaster("Plan updated successfully.");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteBoard = async () => {
    try{
      await deleteBoard(id);
      setToaster("The plan is deleted");
    }catch(err) {
      console.log(err);
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

  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={3}>
          <Paper sx={{backgroundColor: 'transparent', backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)', boxShadow: '2', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: '6px 10px 18px rgba(0, 0, 0, 0.1)' }}}>
            <Stack p={2} borderLeft='5px solid' borderColor={colors[color]}>
              <Stack direction='row' justifyContent='space-between' alignItems="center">
                <Box width='50%'>
                  <Typography textOverflow='ellipsis' overflow='hidden' whiteSpace='nowrap' fontWeight={400} variant='h6'>
                    {name}
                  </Typography>
                </Box>
                <IconButton size='small' onClick={() => navigate(`/boards/${id}`)}><OpenIcon /></IconButton>
              </Stack>
              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Typography variant='caption'>Created At: {createdAt}</Typography>
                <Stack direction='row'>
                  <IconButton onClick={handleOpenModal}><Update /></IconButton>
                  <IconButton onClick={handleClickOpen}><Delete /></IconButton>
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
                      <Button onClick={handleDeleteBoard} autoFocus color='error'>
                        Yes
                      </Button>
                      <Button onClick={handleClose}>No</Button>
                    </DialogActions>
                  </Dialog>
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