import { useState } from 'react';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import CreateTransaction from './modals/CreateTransaction';
import TransferMoney from './modals/TransferMoney';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import CCPayment from './modals/CreateCreditCardPayment';
import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setTransferType } from '../../features/account/accountSlice';

export default function SideBar() {
  const dispatch = useAppDispatch();

  const accounts = useAppSelector((state) => state.account.userAccounts);

  const [openCreateTransaction, setOpenCreateTransaction] = useState(false);
  const handleCreateTransactionOpen = () => { setOpenCreateTransaction(true); };
  const handleCreateTransactionClose = () => { setOpenCreateTransaction(false); };

  const [openCreatePayment, setOpenCreatePayment] = useState(false);
  const handleCreatePaymentOpen = () => { setOpenCreatePayment(true); };
  const handleCreatePaymentClose = () => { setOpenCreatePayment(false); };

  const [openTransferMoney, setOpenTransferMoney] = useState(false);
  const handleTransferMoneyOpen = () => {
    setOpenTransferMoney(true);
    dispatch(setTransferType("betweenAccounts"));
  };
  const handleTransferMoneyClose = () => { setOpenTransferMoney(false); };
  const handleSendMoneyOpen = () => {
    setOpenTransferMoney(true);
    dispatch(setTransferType("betweenUsers"));
  };

  function moreThanOneAccount() {
    if(accounts.length > 1) {
      return (
        <>
          <MenuItem onClick={handleTransferMoneyOpen}><MoveDownIcon /> Transfer Money </MenuItem>
          <TransferMoney handleClose={handleTransferMoneyClose} open={openTransferMoney} />
        </>  
      )
    }
    return <></>
  }

  return (
    <Sidebar
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: 'white',
          marginTop: '25px',
          borderRight: 'none',
          color: '#5E548E',
          paddingTop: '3rem'
        }
      }}>
      <Menu>
        {/* <MenuItem /> */}
        <MenuItem onClick={handleCreateTransactionOpen}><PointOfSaleIcon /> Create Transaction </MenuItem>
        <CreateTransaction handleClose={handleCreateTransactionClose} open={openCreateTransaction} />

        <MenuItem onClick={handleSendMoneyOpen}><SendAndArchiveIcon /> Send Money </MenuItem>
        <TransferMoney handleClose={handleTransferMoneyClose} open={openTransferMoney} />

        {moreThanOneAccount()}

        <MenuItem onClick={handleCreatePaymentOpen}><LocalAtmIcon /> Make a Payment </MenuItem>
        <CCPayment handleClose={handleCreatePaymentClose} open={openCreatePayment} />

        {/* <MenuItem><CancelIcon /> Close Account </MenuItem> */}
      </Menu>
    </Sidebar>
  )
}