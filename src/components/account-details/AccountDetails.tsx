import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setAccountTransactions } from '../../features/account/accountSlice';
import { apiGetAllTransactions } from '../../remote/banking-api/account.api';
import './AccountDetails.css';
import RenderTransactions from './RenderTransactions';
import SideBar from './SideBar';

export default function AccountDetails() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const transactions = useAppSelector(
    (state) => state.account.accountTransactions
  );
  const currentAccount = useAppSelector(
    (state) => state.account.currentAccount
  );

  const fetchAll = async () => {
    if (user) {
      let token: string = sessionStorage.getItem('token') || '';
      const result = await apiGetAllTransactions(currentAccount?.id, token);
      dispatch(setAccountTransactions(result.payload));
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    fetchAll();
  }, [user, navigate, currentAccount]);

  return (
    <>
      <div className={'top-container'}>
        <SideBar />
        <div className="account-wrap">
          <div className="account-details">
            <h2>{currentAccount.name}</h2>
            <p>Acct Num: {currentAccount.id}</p>
            <h1>
              $
              {currentAccount.balance.toLocaleString(navigator.language, {
                minimumFractionDigits: 2,
              })}
            </h1>
            <Button
              sx={{ color: 'black', width: '200px', border: '1px solid black' }}
              onClick={() => {
                navigate('/');
              }}
            >
              Back to Accounts
            </Button>
          </div>
        </div>
      </div>

      <RenderTransactions transactions={transactions} />
    </>
  );
}
