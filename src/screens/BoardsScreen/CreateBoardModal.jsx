/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Dialog, Stack, TextField, Typography, Box, Button } from '@mui/material'
import ModalHeader from '../../components/layouts/ModalHeader'
import { colors } from '../../theme'
import useApp from '../../hooks/useApp'
import useStore from '../../store'

const CreateBoardModal = ({closeModal, board, isUpdate}) => {
  const {createBoard, updateBoard} = useApp();
  const [name, setname] = useState(board?.name || '');
  const [color, setcolor] = useState(board?.color || 0);
  const [loading, setloading] = useState(false);
  const {setToaster} = useStore();

  const handleAction = async () => {
    const tName = name.trim()
    if(!tName){
      setToaster("Enter a plan name");
      return;
    }
    if (!/^[a-zA-Z0-9\s]{1,20}$/.test(tName))
      return setToaster(
        "Plan name cannot contain special characters and should not be more than 20 characters"
      );
    try {
      setloading(true);
      if (isUpdate) {
        await updateBoard(board.id, { name: tName, color });
      } else {
        await createBoard({ name, color });
      }
      closeModal();
    } catch (err) {
      setloading(false);
      console.log(err);
    }
  };
  
  return (
    <Dialog open fullWidth maxWidth="xs" onClose={closeModal}>
      <Stack p={2}>
        <ModalHeader onClose={closeModal} title={isUpdate ? "Update Plan" : "Create Plan"} />
        <Stack my={5} spacing={3}>
          <TextField value={name} onChange={(e) => setname(e.target.value)} label="Plan Name" />
          <Stack spacing={1.5} direction='row'>
            <Typography>Color: </Typography>
            {colors.map((clr, idx) => <Box sx={{cursor: 'pointer', border: color === idx ? "3px solid #FAF1E4" : "none", outline:`2px solid ${clr}`}} onClick={() => setcolor(idx)} key={clr} height={25} width={25} backgroundColor={clr} borderRadius='50%' />)}
          </Stack>
        </Stack>
        <Button disabled={loading} onClick={handleAction} variant='contained' size='large'>{isUpdate? "Update" : "Create"}</Button>
      </Stack>
    </Dialog>
  )
}

export default CreateBoardModal