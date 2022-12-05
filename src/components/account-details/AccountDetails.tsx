import Button from '@mui/material/Button';
import { SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Transaction } from '../../models/Transaction';
import {
  apiGetTotalTransactionSize,
  apiGetTransactions,
} from '../../remote/banking-api/account.api';
import Navbar from '../navbar/Navbar';
import './AccountDetails.css';
import SideBar from './SideBar';
import StyledTable from './StyledTable';

import { useAppSelector } from '../../app/hooks';
import { Popover } from '@mui/material';
import NotificationList from '../navbar/notifications/NotificationList';

export default function AccountDetails() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const [transaction, setTransactions] = useState<Transaction[]>([]);
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

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    if(mode === 'RECENT'){
    fetchData();
    } else if(mode === 'INCOME'){
      console.log('income fetch');
    } else if (mode === 'EXPENSE'){
      console.log('expense fetch');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate, page, mode]);


const [anchorEl, setAnchorEl] = useState(null);

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
      <Navbar />
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
            Sort by: {'currentChoice'}
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
            <NotificationList />{/* LEFT OFF HERE, ONLY NEED OPTIONS AND CORRESPONDING FETCHES */}
          </Popover>
        </div>

        <StyledTable
          transaction={transaction}
          page={page}
          setPage={setPage}
          transSize={transSize}
        />
      </div>
    </>
  );
}
