import { Grid, Paper, Stack, Typography, IconButton, Box } from '@mui/material'
import OpenIcon from '@mui/icons-material/Launch'

const BoardCard = () => {
  return (
    <Grid item xs={3}>
          <Paper sx={{backgroundColor: 'transparent', backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)'}}>
            <Stack p={2} borderLeft='5px solid' borderColor='white'>
              <Stack direction='row' justifyContent='space-between' alignItems="center">
                <Box width='50%'>
                  <Typography textOverflow='ellipsis' overflow='hidden' whiteSpace='nowrap' fontWeight={400} variant='h6'>
                    Board Name
                  </Typography>
                </Box>
                <IconButton size='small'><OpenIcon /></IconButton>
              </Stack>
              <Typography variant='caption'>Created At: 09/05/2024</Typography>
            </Stack>
          </Paper>
        </Grid>
  )
}

export default BoardCard