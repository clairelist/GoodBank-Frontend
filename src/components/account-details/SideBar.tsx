import { useState } from 'react';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import CreateTransaction from './modals/CreateTransaction';
import TransferMoney from './modals/TransferMoney';

export default function SideBar() {
    const [openCreateTransaction, setOpenCreateTransaction] = useState(false);
    const handleCreateTransactionOpen = () => { setOpenCreateTransaction(true); };
    const handleCreateTransactionClose = () => { setOpenCreateTransaction(false); };

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
            <MenuItem onClick={handleCreateTransactionOpen}> Create Transaction </MenuItem>
            <CreateTransaction handleClose={handleCreateTransactionClose} open={openCreateTransaction}/>
            <MenuItem> Send Money </MenuItem>
            <MenuItem onClick={handleTransferMoneyOpen}> Transfer Money </MenuItem>
            <TransferMoney handleClose={handleTransferMoneyClose} open={openTransferMoney} />
            <MenuItem> Make a Payment </MenuItem>
            <MenuItem> Close Account </MenuItem>
            </Menu>
        </Sidebar>
    )
}