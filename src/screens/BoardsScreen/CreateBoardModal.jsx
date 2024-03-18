/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Dialog, Stack, TextField, Typography, Box, Button } from '@mui/material'
import ModalHeader from '../../components/layouts/ModalHeader'
import { colors } from '../../theme'
import useApp from '../../hooks/useApp'

const CreateBoardModal = ({closeModal}) => {
  const {createBoard} = useApp();
  const [name, setname] = useState("");
  const [color, setcolor] = useState(0);
  const [loading, setloading] = useState(false);

  const handleCreate = async () => {
    try{
      setloading(true);
      await createBoard({name, color});
      closeModal();
    }catch(err){
      setloading(false);
      console.log(err);
    }
  }
  
  return (
    <Dialog open fullWidth maxWidth="xs" onClose={closeModal}>
      <Stack p={2}>
        <ModalHeader onClose={closeModal} title="Create Plan" />
        <Stack my={5} spacing={3}>
          <TextField value={name} onChange={(e) => setname(e.target.value)} label="Plan Name" />
          <Stack spacing={1.5} direction='row'>
            <Typography>Color: </Typography>
            {colors.map((clr, idx) => <Box sx={{cursor: 'pointer', border: color === idx ? "3px solid #383838" : "none", outline:`2px solid ${clr}`}} onClick={() => setcolor(idx)} key={clr} height={25} width={25} backgroundColor={clr} borderRadius='50%' />)}
          </Stack>
        </Stack>
        <Button disabled={loading} onClick={handleCreate} variant='contained' size='large'>Create</Button>
      </Stack>
    </Dialog>
  )
}

export default CreateBoardModal