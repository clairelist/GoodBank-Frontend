import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { apiGetAccounts } from '../../remote/banking-api/account.api';
import { LoanDetails } from '../../models/LoanDetails';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import OpenAccount from '../home/OpenAccountForm';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import accountSlice, { setCurrentAccount } from '../../features/account/accountSlice';
import { apiGetLoans } from '../../remote/banking-api/loan.api';

const Loans = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checked, setChecked] = useState(false);
    const user = useAppSelector((state) => state.user.user);
    const [loans, setLoans] = useState([]);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        
        const getLoans = async () => {
            if (user) {
          const response = await apiGetLoans(
            user.id
          );
          console.log(response.payload);
          
            setLoans(response.payload);
          }
        
        }
        getLoans();
    }
        ,[user])
        
        

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