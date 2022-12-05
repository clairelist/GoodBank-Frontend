import { useEffect, useState } from 'react';
import { Transaction } from '../../models/Transaction';
import { apiGetTotalTransactionSize, apiGetTransactions } from '../../remote/banking-api/account.api';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import './AccountDetails.css';
import CreateTransactionForm from './CreateTransactionForm';
import Button from '@mui/material/Button';
import StyledTable from './StyledTable';
import SideBar from './SideBar';

import { useAppSelector } from '../../app/hooks';

export default function AccountDetails() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const [transaction, setTransactions] = useState<Transaction[]>([]);
  const currentAccount = useAppSelector((state) => state.account.currentAccount);
  const [page, setPage] = useState(1);
  const [transSize, setTransSize] = useState(0);
  let txnForm;

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
