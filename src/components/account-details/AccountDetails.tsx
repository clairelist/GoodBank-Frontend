import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import { Transaction } from '../../models/Transaction';
import {
  apiGetAccount,
  apiGetTransactions,
} from '../../remote/banking-api/account.api';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import './AccountDetails.css';
import CreateTransactionForm from './CreateTransactionForm';
import { Account } from '../../models/Account';
import Button from '@mui/material/Button';
import StyledTable from './StyledTable';
import SideBar from './SideBar';


export default function AccountDetails() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [transaction, setTransactions] = useState<Transaction[]>([]);
  const [account, setAccount] = React.useState<Account>();
  let txnForm = <></>;

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    const fetchData = async () => {
      if (user) {
        const resultAcct = await apiGetAccount(user.id);
        setAccount(resultAcct.payload);
        const result = await apiGetTransactions(resultAcct.payload.id);
        setTransactions(result.payload.reverse());
      }
    };
    fetchData();
  }, [user, navigate]);

  useEffect(() => {
    (async () => {
      if (user) {
        const resultAcct = await apiGetAccount(user.id);
        setAccount(resultAcct.payload);
      }
    })();
  }, [transaction, user]);

  if (account) {
    txnForm = (
      <CreateTransactionForm
        accountId={account!.id}
        afterUpsert={(result) => setTransactions([result, ...transaction])}
      />
    );
  }

  return (
    <>
      <Navbar />
      <div className={'top-container'}>
      <SideBar />
        <div className='account-details'>
          <h2>{account?.name}</h2>
          <h1>${account?.balance}</h1>
          <Button
            onClick={() => {
              navigate('/');
            }}
          >
            Go Back
          </Button>
        </div>
      </div>
      <div className='txn-wrap'>
        <h1 className='title'>Recent Transactions</h1>
        <StyledTable transaction={transaction}/>
      </div>
    </>
  );
}
