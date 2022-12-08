import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {  setUserAccounts } from '../../features/account/accountSlice';
import { Account } from '../../models/Account';
import { apiGetAccounts } from '../../remote/banking-api/account.api';
import OpenAccount from '../home/OpenAccountForm';
import AccountListItem from './AccountListItem';

export default function Accounts() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checked, setChecked] = useState(false);
  const accounts = useAppSelector((state) => state.account.userAccounts);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
      fetchData();
    } else {
      setLoggedIn(false);
      navigate('/login');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  const fetchData = async () => {
    if (user) {
      let token: string = sessionStorage.getItem('token') || '';
      const result = await apiGetAccounts(user?.id, token);
      dispatch(setUserAccounts(result.payload));
    }
  };

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  let Account = <></>;
  if (!accounts && loggedIn) {
    //If no account in database but logged in, option to create an account appears
    Account = (
      <>
        <Grid
          container
          sx={{
            display: 'flex',
            alignItems: 'flexStart',
            direction: 'column',
            justifyContent: 'center',
          }}
          columns={12}
        >
          <Grid item sm={12} md={12}>
            <h2 style={{ textAlign: 'center', marginTop: '3%', color: 'gray' }}>
              No account was found, please create!
            </h2>
          </Grid>
          <Grid item sm={12} md={12}>
            <Button
              onClick={() => {
                handleChange();
              }}
              sx={{ margin: '0 auto', display: 'flex' }}
            >
              Open Account
            </Button>
          </Grid>
          <OpenAccount checked={checked} />
        </Grid>
      </>
    );
  } else if (loggedIn) {
    //if logged in and there is an account
    Account = (
      <>
        <Grid
          container
          sx={{
            display: 'flex',
            alignItems: 'flexStart',
            direction: 'column',
            justifyContent: 'center',
          }}
          columns={12}
        >
          <Typography variant="h2" sx={{ marginTop: '20px' }}>
            Accounts
          </Typography>
          {accounts?.map((account: Account) => (
            <AccountListItem key={account.id} account={account} />
          ))}

          {/* <Grid item sm={12} md={12}>
                <h2 style={{ textAlign: 'center', marginTop: '3%', color: 'gray' }}>
                  Create a new account!
                </h2>
              </Grid> */}
          <Grid item sm={12} md={12}>
            <Button
              onClick={() => {
                handleChange();
              }}
              sx={{ margin: '0 auto', display: 'flex' }}
            >
              Open A New Account
            </Button>
          </Grid>
          <OpenAccount checked={checked} setChecked={setChecked}/>
        </Grid>
      </>
    );
  }

  return <>{Account}</>;
}