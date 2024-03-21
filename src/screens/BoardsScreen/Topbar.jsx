/* eslint-disable react/prop-types */
import { AppBar, Toolbar, Button, Stack, Typography, useMediaQuery, IconButton } from '@mui/material'
import ImageEl from '../../components/utils/imageEl'
import logo from '../../assets/list.svg'
import LogOutIcon from '@mui/icons-material/ExitToApp'
import CreateIcon from '@mui/icons-material/AddCircle'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'

const Topbar = ({openModal}) => {

  const isXs = useMediaQuery(theme => theme.breakpoints.only('xs'));

  return (
    <AppBar sx={{
      backgroundColor: 'transparent', backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)', position:'static'}}>
      <Toolbar sx={{justifyContent: 'space-between'}}>
        <Stack direction="row" spacing={1} alignItems="center">
          <ImageEl src={logo} alt='Daily Biz!' sx={{height:50}}/> 
          <Typography variant='h6'>Daily Biz!</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          {isXs ? <>
            <IconButton onClick={openModal}><CreateIcon style={{color:'#435334'}}/></IconButton>
            <IconButton onClick={() => signOut(auth)}><LogOutIcon style={{color:'#435334'}}/></IconButton>
          </>
            : <><Button onClick={openModal} variant='contained'>Create Plan</Button>
          <Button onClick={() => signOut(auth)} startIcon={<LogOutIcon />} style={{color:'#435334'}}>Logout</Button></>}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar