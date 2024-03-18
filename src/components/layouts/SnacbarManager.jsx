import { Snackbar } from '@mui/material'
import useStore from '../../store'

const SnacbarManager = () => {
  const {toasterMsg, setToaster} = useStore();
  return (
    <Snackbar message={toasterMsg} open={!!toasterMsg} autoHideDuration={5*1000} onClose={() => setToaster('')}  />
  )
}

export default SnacbarManager