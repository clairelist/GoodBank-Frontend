import { useState } from 'react';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import CreateTransaction from './modals/CreateTransaction';
import TransferMoney from './modals/TransferMoney';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CancelIcon from '@mui/icons-material/Cancel';
import SendMoney from './modals/SendMoney';

export default function SideBar() {
  const [openCreateTransaction, setOpenCreateTransaction] = useState(false);
  const handleCreateTransactionOpen = () => { setOpenCreateTransaction(true); };
  const handleCreateTransactionClose = () => { setOpenCreateTransaction(false); };

  //TransferMoney
  const [openTransferMoney, setOpenTransferMoney] = useState(false);
  const handleTransferMoneyOpen = () => { setOpenTransferMoney(true); };
  const handleTransferMoneyClose = () => { setOpenTransferMoney(false); };

  //SendMoney
  const [openSendMoney, setOpenSendMoney] = useState(false);
  const handleSendMoneyOpen = () => { setOpenSendMoney(true); };
  const handleSendMoneyClose = () => { setOpenSendMoney(false); };



  return (
    <Sidebar
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: 'white',
          marginTop: '25px',
          borderRight: 'none'
        }
      }}>
      <Menu>
        <MenuItem onClick={handleCreateTransactionOpen}><PointOfSaleIcon /> Create Transaction </MenuItem>
        <CreateTransaction handleClose={handleCreateTransactionClose} open={openCreateTransaction} />
        <MenuItem><SendAndArchiveIcon /> Send Money </MenuItem>
        <MenuItem onClick={handleTransferMoneyOpen}><MoveDownIcon /> Transfer Money </MenuItem>
        <TransferMoney handleClose={handleTransferMoneyClose} open={openTransferMoney} />
        <MenuItem><LocalAtmIcon /> Make a Payment </MenuItem>
        <SendMoney handleClose={handleSendMoneyClose} open={openSendMoney} />
        <MenuItem><CancelIcon /> Close Account </MenuItem>
      </Menu>
    </Sidebar>
  )
}