import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { apiGetAccount } from '../../remote/banking-api/account.api';
import { Account } from '../../models/Account';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import OpenAccount from './OpenAccountForm';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUser } from '../../features/user/userSlice';


export default function Home() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);

  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  //*********  TODO we stop here ***********

  React.useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      navigate('/login');
    }
  }, [user, navigate]);

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const [account, setAccount] = React.useState<Account>();

  React.useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const result = await apiGetAccount(user?.id);
        setAccount(result.payload);
      }
    };
    fetchData();
  }, [user]);

  let Account = <></>;
  if (!account && loggedIn) {
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
                
                navigate('/details');
              }}
              sx={{ margin: '0 auto', display: 'flex' }}
            >
              Open Account
            </Button>
          </Grid>
          <OpenAccount checked={checked} />
        </Grid>
        ;
      </>
    );
  } else if (loggedIn) {
    //if logged in and there is an account
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
          <Typography variant="h2" sx={{ marginTop: '20px' }}>
            Your Bank Account
          </Typography>

          <Grid item mt={2} sm={12} md={12}>
            <Card sx={{ margin: '0 auto', display: 'flex', maxWidth: '700px' }}>
              <CardContent>
                <Typography variant="h3" color="text.secondary">
                  {account?.name}
                </Typography>
                <Typography variant="h6" component="div">
                  {account?.accountType}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Created On: {account?.creationDate}
                </Typography>
                <Button
                  onClick={() => {
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
        </Grid>
      </>
    );
  }

  return <>{Account}</>;
}
