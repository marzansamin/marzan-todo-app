/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Stack, Grid, Typography, IconButton, Box, Paper } from '@mui/material'
import OpenIcon from '@mui/icons-material/Launch'
import CreateBoardModal from "./CreateBoardModal";
import Topbar from "./Topbar";
import NoBoards from './NoBoards';
import BoardCard from './BoardCard';

const BoardsScreen = () => {
  const [showModal, setshowModal] = useState(false);
  
  return <>
    <Topbar openModal = {() => setshowModal(true)} />
    {showModal && <CreateBoardModal closeModal = {() => setshowModal(false)} />}
    {/* <NoBoards /> */}

    <Stack mt={5} px={3}>
      <Grid container spacing={4}>
        <BoardCard />
      </Grid>
    </Stack>
  </>
};

export default BoardsScreen