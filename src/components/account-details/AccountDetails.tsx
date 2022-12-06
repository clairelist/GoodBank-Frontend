import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
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

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setAccountTransactions } from '../../features/account/accountSlice';

export default function AccountDetails() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  // const [transaction, setTransactions] = useState<Transaction[]>([]);
  const transactions = useAppSelector((state) => state.account.accountTransactions);
  const currentAccount = useAppSelector((state) => state.account.currentAccount);
  const [page, setPage] = useState(1);
  const [transSize, setTransSize] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    const fetchData = async () => {
      if (user) {
        let token: string = sessionStorage.getItem('token') || '';
        const result = await apiGetTransactions(currentAccount?.id, token, page-1);
        dispatch(setAccountTransactions(result.payload));
        const transCount = await apiGetTotalTransactionSize(currentAccount?.id);
        setTransSize(transCount.payload);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate, page]);

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
        <h1 className="title">Recent Transactions</h1>
        <StyledTable
          transaction={transactions}
          page={page}
          setPage={setPage}
          transSize={transSize}
        />
      </div>
    </>
  );
}
