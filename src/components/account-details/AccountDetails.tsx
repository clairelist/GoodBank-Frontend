import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import { Transaction } from '../../models/Transaction';
import { apiGetAccounts, apiGetTransactions } from '../../remote/banking-api/account.api';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import './AccountDetails.css';
import CreateTransactionForm from './CreateTransactionForm';
import { Account } from '../../models/Account';
import Button from '@mui/material/Button';
import StyledTable from './StyledTable';
import SideBar from './SideBar';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setAccountTransactions } from '../../features/account/accountSlice';

export default function AccountDetails() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  // const [transaction, setTransactions] = useState<Transaction[]>([]);
  const transactions = useAppSelector((state) => state.account.accountTransactions);
  const currentAccount = useAppSelector((state) => state.account.currentAccount);
  let txnForm = <></>;

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    const fetchData = async () => {
      if (user) {
        // const resultAcct = await apiGetAccounts(user.id);
        // setAccount(resultAcct.payload);
        const result = await apiGetTransactions(currentAccount?.id);
        dispatch(setAccountTransactions(result.payload.reverse()));
      }
    };
    fetchData();
  }, [user, navigate]);

  // useEffect(() => {
  //   (async () => {
  //     if (user) {
  //       const resultAcct = await apiGetAccounts(user.id);
  //       setAccount(resultAcct.payload);
  //     }
  //   })();
  // }, [transaction, user]);

  // if (currentAccount) {
  //   txnForm = (
  //     <CreateTransactionForm
  //       accountId={currentAccount?.id}
  //       afterUpsert={(result) => setTransactions([result, ...transaction])}
  //     />
  //   );
  // }

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
      <div className='txn-wrap'>
        <h1 className='title'>Recent Transactions</h1>
        <StyledTable transaction={transactions}/>
      </div>
    </>
  );
}
