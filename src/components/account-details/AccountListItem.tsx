import { Card, CardContent, Grid, Typography, Button } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { setCurrentAccount } from '../../features/account/accountSlice';
import { Account } from '../../models/Account';
import { priceFormatter } from '../../features/util/generalUtils';

interface IAccountListItemProps {
  account: Account;
}

export default function AccountListItem(props: IAccountListItemProps) {
  const { account } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let convertedTime = undefined;
  if (account.creationDate) {
    convertedTime = new Date(account.creationDate).toLocaleDateString('en-US');
  }

  return (
    <>
      <Grid item mt={2} sm={12} md={12}>
        <Card sx={{ margin: '0 auto', display: 'flex', maxWidth: '700px' }} variant="outlined">
          <CardContent>
            <Typography variant="h3" color="text.secondary">
              {account?.name}
            </Typography>
            
            {convertedTime ?
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Created On: {convertedTime}
            </Typography>
            : ''}
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
              Balance: {priceFormatter.format(account?.balance)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
