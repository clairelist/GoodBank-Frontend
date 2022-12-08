import { Box, Modal, Typography } from "@mui/material";
import CreatePaymentForm from "../CreatePaymentForm"
// make ccpayment
// we need to grab the current credit card ID, current user ID and
// an accountID from a dropdown list
// accountIds need to come from current user's account
//then get all cc transactions
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

export default function CCPayment(props: any) {
    //is this grabbing a user already in state?
    //yes, if not previously set it will be initialState, otherwise it will have values
    

    return (
        <>
        <Modal
            open={props.open}
            onClose={props.handleClose}
            >
            <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Payment
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Payment Form Here
            <CreatePaymentForm handleClose={props.handleClose}/>
          </Typography>
        </Box>
        </Modal>
        </>
    )

}