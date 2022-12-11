import { Card, CardContent, Box, Typography, Button } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { setCurrentAccount } from '../../features/account/accountSlice';
import { Account } from '../../models/Account';
import { priceFormatter } from '../../features/util/generalUtils';
import { cardButtonStyles, cardStyles } from '../home/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavingsIcon from '@mui/icons-material/Savings';

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
    <Card sx={cardStyles} variant="outlined">
      <CardContent sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="h4">{account?.name}</Typography>
          {account?.accountType === 'CHECKING' ? (
            <AccountBalanceWalletIcon
              fontSize="large"
              sx={{ marginLeft: 'auto' }}
            />
          ) : (
            <SavingsIcon fontSize="large" sx={{ marginLeft: 'auto' }} />
          )}
        </Box>
        {convertedTime ? (
          <Typography
            sx={{
              mb: 1.5,
              borderBottom: '1px solid white',
            }}
          >
            {' '}
            Created On: {convertedTime}{' '}
          </Typography>
        ) : (
          ''
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={() => {
              dispatch(setCurrentAccount(account));
              navigate('/details');
            }}
            sx={cardButtonStyles}
          >
            Details
          </Button>
          <Typography
            variant="body2"
            sx={{ fontWeight: '600', fontSize: '1rem' }}
          >
            BALANCE: {priceFormatter.format(account?.balance)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
