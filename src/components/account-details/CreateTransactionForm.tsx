import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import { apiUpsertTransaction } from '../../remote/banking-api/account.api';
import { Transaction } from '../../models/Transaction';
import MenuItem from '@mui/material/MenuItem';
import './AccountDetails.css';
import Grid from '@mui/material/Grid';

interface TransactionProps {
  accountId: number;
  afterUpsert: (result: Transaction) => void;
}

export default function CreateTransactionForm(props: TransactionProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let token: string = sessionStorage.getItem('token') || "";
    //const response = await apiUpsertTransaction(data);
    let payload = new Transaction(
      0,
      parseFloat(data.get('amount')?.toString() || '0'),
      data.get('description')?.toString() || '',
      data.get('type')?.toString() || 'Expense'
    );
    apiUpsertTransaction(props.accountId, payload, token).then((response) => {
      props.afterUpsert(response.payload);
    });
  };

  const [type, setType] = React.useState('Expense');

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const types = [
    {
      value: 'Expense',
      label: '-',
    },
    {
      value: 'Income',
      label: '+',
    },
  ];

  return (
    <React.Fragment>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container direction={'column'} spacing={3}>
          <Grid item>
            <TextField
              required
              id="filled-multiline-static"
              name="description"
              label="Transaction Description"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item>
            <TextField
              required
              id="type"
              name="type"
              label="Expense(-) or Income(+)?"
              fullWidth
              select
              value={type}
              onChange={handleTypeChange}
              size="small"
            >
              {types.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <TextField
              required
              id="amount"
              name="amount"
              label="Amount?"
              fullWidth
              size="small"
              type="number"
              placeholder="$0.00"
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 1 }}
              color="warning"
            >
              Add Transaction
            </Button>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
