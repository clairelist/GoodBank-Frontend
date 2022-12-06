import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import creditCardSlice from '../../features/credit/creditCardSlice';
import { CreditCardTransaction } from '../../models/CreditCardTransaction';
import { apiMakeCreditCardPayment } from '../../remote/banking-api/creditcard.api';

export default function CreatePaymentForm() {
  const user = useAppSelector((state) => state.user.user);
  const accounts = useAppSelector((state) => state.account.userAccounts);
  const currentCCAccount = useAppSelector(
    (state) => state.creditCard.currentCreditCard
  );
  const creditCardTransactions = useAppSelector(
    (state) => state.creditCardTransaction.creditCardTransactions
  );

  const [ccTransactions, setCCTransactions] = useState([]);
  const [account, setAccount] = React.useState('');
  const handleChangeAccount = (event: SelectChangeEvent) => {
    setAccount(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await apiMakeCreditCardPayment(
      new CreditCardTransaction(
        0,
        Number(data.get('amount')) || 0,
        '',
        '',
        currentCCAccount.id,
        Number(data.get('account')) || 0
        //this will be an accountid selected from the drop down menu
      ),
      Number(user?.id)
    );
    setCCTransactions(response.payload);
  };

  return (
    <React.Fragment>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container direction={'column'} spacing={3}>
          <Grid item>
            <TextField
              required
              id="filled-multiline-static"
              name="payment"
              label="Amount to Pay"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item>
              <Select
                required
                id="account"
                name="account"
                label="From Account"
                fullWidth
                value={account}
                onChange={handleChangeAccount}
                size="small"
              >
                {accounts.map(({ id, name }, index) => (
                  <MenuItem key={index} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 1 }}
              color="secondary"
            >
              Submit Payment?
            </Button>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
