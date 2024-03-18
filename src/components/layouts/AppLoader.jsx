import { Stack, CircularProgress } from '@mui/material'

const AppLoader = () => {
  return (
    <Stack mt={10} alignItems="center" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}>
      <CircularProgress />
    </Stack>
  )
}

export default AppLoader