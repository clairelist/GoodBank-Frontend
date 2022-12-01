import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { apiGetAccounts } from '../../remote/banking-api/account.api';
import { Account } from '../../models/Account';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import OpenAccount from '../home/OpenAccountForm';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import accountSlice, { setCurrentAccount } from '../../features/account/accountSlice';

export default function Accounts() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checked, setChecked] = useState(false);
    const [accounts, setAccounts] = useState<Account[]>([] as Account[]);
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
    }, [user, navigate]);

    const fetchData = async () => {
        if (user) {
        const result = await apiGetAccounts(user?.id);
        setAccounts(result.payload);
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
          <Navbar />
          <Grid
            container
            sx={{
              display: 'flex',
              alignItems: 'center',
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
      Account = 
        <>
          <Navbar />
          <Grid
              container
              sx={{
                display: 'flex',
                alignItems: 'center',
                direction: 'column',
                justifyContent: 'center',
              }}
              columns={12}
            >
              <Typography variant="h2" sx={{ marginTop: '20px' }}>
                Your Accounts
              </Typography>
              {accounts?.map((account: Account) => (
                <>
                  <Grid item mt={2} sm={12} md={12}>
                    <Card sx={{ margin: '0 auto', display: 'flex', maxWidth: '700px' }}>
                      <CardContent>
                        <Typography variant="h3" color="text.secondary">
                          {account?.name}
                        </Typography>
                        
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          Created On: {account?.creationDate}
                        </Typography>
                        <Button
                          onClick={() => {
                            dispatch(setCurrentAccount(account));
                            navigate('/details');
                          }}
                        >
                          Account Details
                        </Button>
                        <Typography
                          variant="h5"
                          sx={{ display: 'flex', justifyContent: 'flex-end' }}
                        >
                          Balance: {account?.balance}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </>
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
              <OpenAccount checked={checked} />
          </Grid>
        </>
      ;
      
    }
  
    return <>{Account}</>
    
  }

  // React.useEffect(() => {
  //   if (user) {
  //     setLoggedIn(true);
  //   } else {
  //     setLoggedIn(false);
  //     navigate('/login');
  //   }
  // }, [user, navigate]);

  // const handleChange = () => {
  //   setChecked((prev) => !prev);
  // };

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     if (user) {
  //       const result = await apiGetAccount(user?.id);
  //       setAccounts(result.payload);
  //     }
  //   };
  //   fetchData();
  // }, [user]);