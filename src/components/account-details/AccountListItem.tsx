import { Card, CardContent, Box, Typography, Button } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { setCurrentAccount } from '../../features/account/accountSlice';
import { Account } from '../../models/Account';
import { priceFormatter } from '../../features/util/generalUtils';
import { cardButtonStyles, cardStyles } from '../home/Home';

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
      <CardContent>
        <Typography variant="h3">{account?.name}</Typography>

        {convertedTime ? (
          <Typography sx={{ mb: 1.5 }}>Created On: {convertedTime}</Typography>
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
          <Typography variant="h5">
            Balance: {priceFormatter.format(account?.balance)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
