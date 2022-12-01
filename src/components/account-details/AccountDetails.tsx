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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

export default function AccountDetails() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const [transaction, setTransactions] = useState<Transaction[]>([]);
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
        setTransactions(result.payload.reverse());
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
        <div className="form-wrap">{txnForm}</div>
      </div>
      <div className="txn-wrap">
        <h1 className="title">Transactions</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Amount</TableCell>
                <TableCell align="center">Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transaction.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">${row.amount}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
