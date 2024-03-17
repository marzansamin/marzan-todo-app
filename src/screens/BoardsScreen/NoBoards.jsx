import { Stack, Typography } from '@mui/material'

const NoBoards = () => {
  return (
    <Stack mt={15} textAlign='center' spacing={1}>
      <Typography variant='h5'>No Plans For Now</Typography>
      <Typography>Start Organizing Your Tasks By Creating Plans!</Typography>
    </Stack>
  )
}

export default NoBoards