import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { LoanDetails } from '../../models/LoanDetails';
import { apiGetLoans } from '../../remote/banking-api/loan.api';
import { CardContent, Stack, Card, Box } from '@mui/material';

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
    <Stack spacing={2} sx={{ alignItems: 'center' }}>
      <Typography sx={{ fontSize: 22, color: '#5E548E' }}>Loans:</Typography>

      {loans
        .filter((x: LoanDetails) => x.status !== 'DENIED')
        .map((loan: LoanDetails) => {
          let convertedTime = undefined;
          if (loan.creationDate) {
            convertedTime = new Date(loan.creationDate).toLocaleDateString(
              'en-US'
            );
          }

          return (
            <Card key={loan.loanID + 1} sx={cardStyles} variant="outlined">
              <CardContent sx={{ width: '100%' }}>
                <div style={{ display: 'flex' }}>
                  <Typography variant="h4">{loan.reason}</Typography>
                  <img style={{marginLeft: 'auto', width: '40px', height: '40px'}} src="loan.png" />
                </div>
                <Typography sx={{ mb: 1.5, borderBottom: '1px solid white' }}>
                  Loan Date: {convertedTime}
                </Typography>

                <Typography
                  variant="body2"
                  color="white"
                  sx={{
                    fontWeight: '600',
                    fontSize: '1rem',
                  }}
                >
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span>LOAN AMOUNT:</span>
                    <span>{priceFormatter.format(loan.initialAmount)} </span>
                  </Box>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span>BALANCE:</span>
                    <span>{priceFormatter.format(loan.balance)} </span>
                  </Box>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span>STATUS:</span>
                    <span>
                      {loan.status === 'PENDING'
                        ? 'AWAITING FOR APPROVAL'
                        : 'DENIED'}
                    </span>
                  </Box>
                </Typography>
              </CardContent>
            </Card>
          );
        })}
    </Stack>
  );
};

export default Loans;
