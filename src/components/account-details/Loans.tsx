import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { LoanDetails } from '../../models/LoanDetails';
import { useAppSelector } from '../../app/hooks';
import { apiGetLoans } from '../../remote/banking-api/loan.api';

const Loans = () => {
    const user = useAppSelector((state) => state.user.user);
    const [loans, setLoans] = useState([]);

    useEffect(()=>{
        const getLoans = async () => {
            if (user) {
          const response = await apiGetLoans(
            user.id
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
      {loans ? (
        <div>
          {loans.map((loan: LoanDetails) => (
            <div key={loan.loanID + 1}>
              <Grid>
                <Grid item mt={2} sm={12} md={12}>
                  <Card
                    sx={{
                      margin: '0 auto',
                      display: 'flex',
                      maxWidth: '700px',
                    }}
                  >
                    <Typography variant="h3">{loan.initialAmount}</Typography>
                    <Typography>{loan.reason}</Typography>
                    <Typography>{loan.balance}</Typography>
                    <Typography>{loan.creationDate.toString()}</Typography>
                    <Typography>{loan.status}</Typography>
                  </Card>
                </Grid>
              </Grid>
            </div>
          ))}
        </div>
      ) : (
        'No loans'
      )}
    </Grid>
  );
}

export default Loans