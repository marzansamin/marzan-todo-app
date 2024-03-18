/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { Stack, Grid, Typography, IconButton, Box, Paper } from '@mui/material'
import OpenIcon from '@mui/icons-material/Launch'
import CreateBoardModal from "./CreateBoardModal";
import Topbar from "./Topbar";
import NoBoards from './NoBoards';
import BoardCard from './BoardCard';
import useApp from '../../hooks/useApp';
import AppLoader from '../../components/layouts/AppLoader'
import useStore from '../../store';

const BoardsScreen = () => {
  const [showModal, setshowModal] = useState(false);
  const [loading, setloading] = useState(true);
  const {fetchBoards} = useApp();
  const {areBoardsFetched} = useStore();

  useEffect(() => {
    if(!areBoardsFetched) fetchBoards(setloading); //loader will show if the boards are not fetched
    else setloading(false);
  }, []) //Empty array so that it is called only once for the board fetching

  if(loading) return <AppLoader />
  
  return <>
    <Topbar openModal = {() => setshowModal(true)}/>
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