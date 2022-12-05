import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { LoanDetails } from '../../models/LoanDetails';
import { useAppSelector } from '../../app/hooks';
import { apiGetLoans } from '../../remote/banking-api/loan.api';
import React from 'react';
import { CardContent } from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';

const Loans = () => {
    const user = useAppSelector((state) => state.user.user);
    const [loans, setLoans] = useState([]);

    useEffect(()=>{
        const getLoans = async () => {
            if (user) {
              let token: string = sessionStorage.getItem('token') || "";
              const response = await apiGetLoans(
                user.id, token
              );
                setLoans(response.payload);
            }
        }
        getLoans();
    }, [user])
        
  return (
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
        Your Loans
      </Typography>
      {loans.map((loan: LoanDetails) => (
        <React.Fragment key={loan.loanID + 1}>
          <Grid item mt={2} sm={12} md={12}>
            <Card
            elevation={8}
              sx={{
                margin: '0 auto',
                display: 'flex',
                maxWidth: '700px',
              }}
            >
              <CardContent sx={{ width: '100%' }}>
                <div style={{ display: 'flex' }}>
                  <Typography variant="h3" color="text.secondary">
                    Loan of: {loan.initialAmount}
                  </Typography>
                  <SavingsIcon fontSize="large" sx={{ marginLeft: 'auto' }} />
                </div>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Loan Date: {loan.creationDate.toString()}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  Balance: {loan.balance}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ borderTop: '1px solid black' }}
                >
                  Listed reason for loan: {loan.reason}
                </Typography>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{
                    borderTop: '1px solid black',
                    fontWeight: '600',
                    fontSize: '1rem',
                  }}
                >
                  {loan.status === 'PENDING' ? 'AWAITING FOR APPROVAL' : ''}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
}

export default Loans