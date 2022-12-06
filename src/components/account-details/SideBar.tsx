import { useState } from 'react';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import CCPayment from './modals/CreateCreditCardPayment';
import CreateTransaction from './modals/CreateTransaction';
import TransferMoney from './modals/TransferMoney';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CancelIcon from '@mui/icons-material/Cancel';

export default function SideBar() {
    const [openCreateTransaction, setOpenCreateTransaction] = useState(false);
    const handleCreateTransactionOpen = () => { setOpenCreateTransaction(true); };
    const handleCreateTransactionClose = () => { setOpenCreateTransaction(false); };
    const [openCreatePayment, setOpenCreatePayment] = useState(false);
    const handleCreatePaymentOpen = () => { setOpenCreatePayment(true); };
    const handleCreatePaymentClose = () => { setOpenCreatePayment(false); };
      //TransferMoney
    const [openTransferMoney, setOpenTransferMoney] = useState(false);
    const handleTransferMoneyOpen = () => { setOpenTransferMoney(true); };
    const handleTransferMoneyClose = () => { setOpenTransferMoney(false); };

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
            <CreateTransaction handleClose={handleCreateTransactionClose} open={openCreateTransaction}/>
            <MenuItem><SendAndArchiveIcon /> Send Money </MenuItem>
            <MenuItem onClick={handleTransferMoneyOpen}><MoveDownIcon /> Transfer Money </MenuItem>
            <MenuItem onClick={handleCreatePaymentOpen}><LocalAtmIcon /> Make a Payment </MenuItem>
            <CCPayment handleClose={handleCreatePaymentClose} open={openCreatePayment}/>
            <MenuItem> Close Account </MenuItem>
            </Menu>
        </Sidebar>
    )
}