import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Transfer from '../../transfer-money/TransferMoney';
import { useAppSelector } from '../../../app/hooks';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TransferMoney(props: any) {
  const transferType = useAppSelector((state) => state.account.transferType);

  function getTransferType() {
    if(transferType === "betweenAccounts") {
      return (
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Transfer Money
          </Typography>
      )
    }
    return (
      <Typography id="modal-modal-title" variant="h6" component="h2">
          Send Money
        </Typography>
    )
  }

  return (
    <>
      <Modal
      open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {getTransferType()}
          <Typography id="modal-modal-description" sx={{ mt: 8 }}>
            <Transfer onClose={props.handleClose} />
          </Typography>
        </Box>
      </Modal>
    </>
  )
}