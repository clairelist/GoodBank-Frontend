import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import { Transaction } from '../../models/Transaction';
import { apiGetAccounts, apiGetTotalTransactionSize, apiGetTransactions } from '../../remote/banking-api/account.api';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import './AccountDetails.css';
import CreateTransactionForm from './CreateTransactionForm';
import { Account } from '../../models/Account';
import Button from '@mui/material/Button';
import StyledTable from './StyledTable';
import SideBar from './SideBar';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

export default function AccountDetails() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const [transaction, setTransactions] = useState<Transaction[]>([]);
  const currentAccount = useAppSelector((state) => state.account.currentAccount);
  const [page, setPage] = useState(1);
  const [transSize, setTransSize] = useState(0);
  let txnForm = <></>;

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    const fetchData = async () => {
      if (user) {
        const result = await apiGetTransactions(currentAccount?.id, page-1);
        setTransactions(result.payload);

        const transCount = await apiGetTotalTransactionSize(currentAccount?.id)
        setTransSize(transCount.payload);
      }
    };
    fetchData();
  }, [user, navigate, page]);

  // useEffect(() => {
  //   (async () => {
  //     if (user) {
  //       const resultAcct = await apiGetAccounts(user.id);
  //       setAccount(resultAcct.payload);
  //     }
  //   })();
  // }, [transaction, user]);

  if (currentAccount) {
    txnForm = (
      <CreateTransactionForm
        accountId={currentAccount?.id}
        afterUpsert={(result) => setTransactions([result, ...transaction])}
      />
    );
  }

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
        <StyledTable transaction={transaction} page={page} setPage={setPage} transSize={transSize} />
      </div>
    </>
  );
}
