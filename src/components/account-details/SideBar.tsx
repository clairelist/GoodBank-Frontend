import { useState } from 'react';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import CreateTransaction from './modals/CreateTransaction';

export default function SideBar() {
    const [openCreateTransaction, setOpenCreateTransaction] = useState(false);
    const handleCreateTransactionOpen = () => { setOpenCreateTransaction(true); };
    const handleCreateTransactionClose = () => { setOpenCreateTransaction(false); };

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
            <MenuItem> Transfer Money </MenuItem>
            <MenuItem> Make a Payment </MenuItem>
            <MenuItem> Close Account </MenuItem>
            </Menu>
        </Sidebar>
    )
}