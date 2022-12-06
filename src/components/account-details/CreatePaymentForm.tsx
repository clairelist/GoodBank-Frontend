import * as React from 'react';
import { useState } from 'react';
import { useAppSelector } from "../../app/hooks";
import TextField from '@mui/material/TextField';
import { Box, Button, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { CreditCardTransaction } from '../../models/CreditCardTransaction';
import { apiMakeCreditCardPayment } from '../../remote/banking-api/creditcard.api';

export default function CreatePaymentForm() {
  const user = useAppSelector((state) => state.user.user);
  const accounts = useAppSelector((state) => state.account.userAccounts);
  const currentCCAccount = useAppSelector((state) => state.creditCard.currentCreditCard);
  const [ccTransactions, setCCTransactions] = useState([]);
  const [account, setAccount] = React.useState("Select an Account");
  const handleChangeAccount = (event: SelectChangeEvent) => {
    setAccount(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let token: string = sessionStorage.getItem('token') || '';
    const response = await apiMakeCreditCardPayment(
      new CreditCardTransaction(
        0,
        Number(data.get("payment")) || 0,
        "",
        "",
        currentCCAccount.id,
        Number(data.get("account")) || 0
        //this will be an accountid selected from the drop down menu
      ),
      Number(user?.id),
      token
    );
    setCCTransactions(response.payload);
  }

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
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="account">To</InputLabel>
              <Select
                id="account"
                name="account"
                label="From Account"
                fullWidth
                value={account}
                onChange={handleChangeAccount}
              >
                {accounts.map((accountz) => (
                  <MenuItem key={accountz.id} value={accountz.id}>
                    {accountz.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
  )
}
