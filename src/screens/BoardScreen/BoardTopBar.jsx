/* eslint-disable react-refresh/only-export-components */

/* eslint-disable react/prop-types */
import { AppBar, Toolbar, Stack, Typography, IconButton } from '@mui/material'
import BackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import { colors } from '../../theme'
import { memo } from 'react'

const BoardTopBar = ({name, lastUpdated, color, deleteBoardInner}) => {
  const navigate = useNavigate();

  return (
    <AppBar sx={{
      backgroundColor: 'transparent', backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)', position:'static', borderBottom:'5px solid', borderColor: colors[color]}}>
      <Toolbar sx={{justifyContent:'space-between'}}>
        <Stack spacing={1} direction='row' alignItems='center'>
          <IconButton onClick={() => navigate("/boards")}><BackIcon /></IconButton>
          <Typography variant='h6'>{name}</Typography>
        </Stack>
        <Stack spacing={2} direction='row' alignItems='center'>
          <Typography display={{xs: 'none', sm:'block'}} variant='body2'>Last Updated: {lastUpdated}</Typography>
          <IconButton onClick={deleteBoardInner}><DeleteIcon  /></IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default memo(BoardTopBar)
