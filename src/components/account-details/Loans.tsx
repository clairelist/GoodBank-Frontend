import SavingsIcon from '@mui/icons-material/Savings';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { LoanDetails } from '../../models/LoanDetails';
import { apiGetLoans } from '../../remote/banking-api/loan.api';
import { CardContent, Stack, Card } from '@mui/material';

import { cardStyles } from '../home/Home';
import { priceFormatter } from '../../features/util/generalUtils';

const Loans = () => {
  const user = useAppSelector((state) => state.user.user);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const getLoans = async () => {
      if (user) {
        let token: string = sessionStorage.getItem('token') || '';
        const response = await apiGetLoans(user.id, token);
        setLoans(response.payload);
      }
    };
    getLoans();
  }, [user]);

  if (loans.length < 1) return <></>;

  return (
    <Stack spacing={2} sx={{alignItems: 'center'}} >
      
      <Typography sx={{fontSize: 22, color: '#5E548E'}}>
        Loans:
      </Typography>
      
      {loans
        .filter((x: LoanDetails) => x.status !== 'DENIED')
        .map((loan: LoanDetails) => {
          
          let convertedTime = undefined;
          if (loan.creationDate) {
            convertedTime = new Date(loan.creationDate).toLocaleDateString('en-US');
          }

          return (
          <Card
            key={loan.loanID + 1}
            sx={cardStyles}
            variant="outlined"
          >
            <CardContent sx={{ width: '100%' }}>
              <div style={{ display: 'flex' }}>
                <Typography variant="h3">
                  Loan of: {priceFormatter.format(loan.initialAmount)}
                </Typography>
                <SavingsIcon fontSize="large" sx={{ marginLeft: 'auto' }} />
              </div>
              <Typography sx={{ mb: 1.5 }}>
                Loan Date: {convertedTime}
              </Typography>
              <Typography
                variant="h5"
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                Balance: {priceFormatter.format(loan.balance)}
              </Typography>
              <Typography variant="body1" sx={{ borderTop: '1px solid black' }}>
                Listed reason for loan: {loan.reason}
              </Typography>
              <Typography
                variant="body2"
                color="white"
                sx={{
                  borderTop: '1px solid black',
                  fontWeight: '600',
                  fontSize: '1rem',
                }}
              >
                {loan.status === 'PENDING' ? 'AWAITING FOR APPROVAL' : 'DENIED'}
              </Typography>
            </CardContent>
          </Card>
        )})}
    </Stack>
  );
};

export default Loans;
