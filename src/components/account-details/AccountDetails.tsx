import Button from '@mui/material/Button';
import { SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Transaction } from '../../models/Transaction';
import {
  apiGetAllTransactions,
  apiGetTotalTransactionSize,
  apiGetTransactions,
} from '../../remote/banking-api/account.api';
import Navbar from '../navbar/Navbar';
import './AccountDetails.css';
import SideBar from './SideBar';
import StyledTable from './StyledTable';

import { useAppSelector } from '../../app/hooks';
import { Box, List, ListItemButton, ListItemText, Popover } from '@mui/material';
import NotificationList from '../navbar/notifications/NotificationList';

export default function AccountDetails() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const [transaction, setTransactions] = useState<Transaction[]>([]);
  const [allTransaction, setAllTransactions] = useState<Transaction[]>([]);
  const currentAccount = useAppSelector(
    (state) => state.account.currentAccount
  );
  const [page, setPage] = useState(1);
  const [transSize, setTransSize] = useState(0);
  const [mode, setMode] = useState('RECENT');
const fetchData = async () => {
  if (user) {
    let token: string = sessionStorage.getItem('token') || '';
    const result = await apiGetTransactions(
      currentAccount?.id,
      token,
      page - 1
    );
    setTransactions(result.payload.reverse());
    const transCount = await apiGetTotalTransactionSize(currentAccount?.id);
    setTransSize(transCount.payload);
  }
};
const fetchAll = async() => {
  if (user) {
    let token: string = sessionStorage.getItem('token') || '';
    const result = await apiGetAllTransactions(
      currentAccount?.id,
      token,
    );
    setAllTransactions(result.payload);
  }
}

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    if(mode === 'RECENT'){
    fetchData();
    fetchAll();
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate, page]);


const [anchorEl, setAnchorEl] = useState(null);

const changeMode = ( newMode: string ) => {
  console.log('input was: ' + newMode)
  console.log('current mode is: ' + mode);
  if (newMode.toLowerCase() !== mode.toLowerCase()) {
    console.log('changing mode to: ' + newMode);
    setPage(1);
    setMode(newMode);
  }
}

const handleClick = (event: any) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

const open = Boolean(anchorEl);
const id = open ? 'simple-popover' : undefined;


  return (
    <>
      <div className={'top-container'}>
        <SideBar />
        <div className="account-wrap">
          <div className="account-details">
            <h2>{currentAccount.name}</h2>
            <h1>{currentAccount.balance}</h1>
            <Button
              onClick={() => {
                navigate('/');
              }}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
      <div className="txn-wrap">
        <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
          <h1 className="title">Recent Transactions</h1>
          <Button
            variant="contained"
            aria-describedby={id}
            sx={{ marginLeft: 'auto' }}
            onClick={handleClick}
          >
            Sort by: {mode}
          </Button>
          <Popover
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            >
              <div aria-label="notifications">
                <List>
                  <ListItemButton>
                    <ListItemText
                      primary={'Recent'}
                      onClick={() => changeMode('RECENT')}
                    />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText
                      primary={'Income'}
                      onClick={() => changeMode('INCOME')}
                    />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText
                      primary={'Expenses'}
                      onClick={() => changeMode('EXPENSE')}
                    />
                  </ListItemButton>
                </List>
              </div>
            </Box>
          </Popover>
        </div>

        <StyledTable
          transaction={
            mode === 'RECENT'
              ? transaction
              : mode === 'EXPENSE'
              ? allTransaction
                  .filter((x) => x.type === 'EXPENSE')
                  .slice(
                    (page - 1) * 5,
                    allTransaction.filter((x) => x.type === 'EXPENSE').length <=
                      5
                      ? undefined
                      : (page - 1) * 5 + 5
                  )
              : mode === 'INCOME'
              ? allTransaction
                  .filter((x) => x.type === 'INCOME')
                  .slice(
                    (page - 1) * 5,
                    allTransaction.filter((x) => x.type === 'INCOME').length <=
                      5
                      ? undefined
                      : (page - 1) * 5 + 5
                  )
              : ''
          }
          page={page}
          setPage={setPage}
          transSize={
            mode === 'RECENT'
              ? transSize
              : mode === 'EXPENSE'
              ? allTransaction.filter((x) => x.type === 'EXPENSE').length
              : allTransaction.filter((x) => x.type === 'INCOME').length
          }
          mode={mode}
        />
      </div>
    </>
  );
}
