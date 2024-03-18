import { Stack, CircularProgress } from '@mui/material'

const AppLoader = () => {
  return (
    <Stack mt={5} alignItems="center" sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
      <CircularProgress />
    </Stack>
  )
}

export default AppLoader