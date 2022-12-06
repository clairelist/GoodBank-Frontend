import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Box, Button } from '@mui/material';
import { apiUpsertTransaction } from '../../remote/banking-api/account.api';
import './AccountDetails.css';
import { useEffect } from 'react';


export default function CreateTransactionForm() {
  const currentAccount = useAppSelector(
    (state) => state.account.currentAccount
  );
  // const dispatch = useAppDispatch();
  const [transactions, setTransactions] = React.useState<Transaction[]>([] as Transaction[]);
  const types = [
    {
      value: 'EXPENSE',
      label: '-',
    },
    {
      value: 'INCOME',
      'label': '+'
    }
  ];
  const user = useAppSelector((state) => state.user.user);
  const accounts = useAppSelector((state) => state.account.currentAccount);
  console.log('account', currentAccount);
  console.log('userAccounts', accounts);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let transaction = new Transaction(
      currentAccount.id,
      Number(data.get('amount')) || 0,
      data.get('description')?.toString() || '',
      data.get('type')?.toString() || 'INCOME' ||'EXPENSE',
      Number(data.get('toAccount') || undefined)
    );

    const response = await apiUpsertTransaction(
      currentAccount.id,
      transaction
    ).then((response) => {
      setTransactions([response.payload, ...transactions])
    });
  };

    const [type, setType] = React.useState('EXPENSE');
    const handleType = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setType(event.target.value);
    };

    React.useEffect(()=>{
      if (user){
        
      }
    })

  return(
    <>
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1}}>
    <TextField
              required
              id="outlined-textarea"
              name="description"
              label="Transaction Description"
              placeholder="Transaction Description"
              fullWidth
              size="small"
            />

             <TextField
              required
              id="type"
              name="type"
              label="Expense(-) or Income(+)?"
              fullWidth
              select
              helperText="Select Transaction Type"
              value={type}
              onChange={handleType}
              size="small"
            >
              {types.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
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
      <Button type="submit">Add Transaction</Button>
    </Box>
    </>
  );
}