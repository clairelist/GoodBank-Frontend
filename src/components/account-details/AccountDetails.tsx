import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Transaction } from '../../models/Transaction';
import { apiGetTransactions } from '../../remote/banking-api/account.api';
import Navbar from '../navbar/Navbar';
import './AccountDetails.css';
import SideBar from './SideBar';
import StyledTable from './StyledTable';

import { useAppSelector } from '../../app/hooks';

export default function AccountDetails() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const [transaction, setTransactions] = useState<Transaction[]>([]);
  const currentAccount = useAppSelector(
    (state) => state.account.currentAccount
  );

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    const fetchData = async () => {
      if (user) {
        const result = await apiGetTransactions(currentAccount?.id);
        setTransactions(result.payload.reverse());
      }
    };
    fetchData();
  }, [user, navigate]);

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
        <StyledTable transaction={transaction} />
      </div>
    </>
  );
}
