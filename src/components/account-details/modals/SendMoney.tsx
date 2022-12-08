import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Send from '../../send-money/SendMoney';

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

export default function SendMoney(props: any) {

  return (
    <>
      <Modal
      open={props.open}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Send Money
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 8 }}>
            <Send onClose={props.handleClose} />
          </Typography>
        </Box>
      </Modal>
    </>
  )
}