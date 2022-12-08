import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { LoanDetails } from '../../models/LoanDetails';
import {
  apiChangeStatus,
  apiGetPendingLoans,
} from '../../remote/banking-api/loan.api';

const AdminLoan = () => {
  const user = useAppSelector((state) => state.user.user);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const getLoans = async () => {
      if (user) {
        let token: string = sessionStorage.getItem('token') || '';
        const response = await apiGetPendingLoans(user.type, token);
        setLoans(response.payload);
      }
    };
    getLoans();
  }, [user]);

  const handleStatus = async (currentLoan: LoanDetails, status: string) => {
    let token: string = sessionStorage.getItem('token') || '';
    currentLoan.status = status;
    const response = await apiChangeStatus(currentLoan, token);
    setLoans(
      loans.filter((x: LoanDetails) => x.loanID !== response.payload.loanID)
    );
  };

  return (
    <Paper style={{width: '70%', margin: 'auto'}}>
      <h1 style={{textAlign: 'center'}}>Pending Loans</h1>
      {loans.length > 0
        ? loans.map((loan: LoanDetails) => (
            <div key={loan.loanID + 1} style={{ textAlign: 'center', borderBottom:'3px solid black', borderRadius: '5px'}}>
              <div style={{display: 'inline-block', textAlign: 'left', fontWeight: 'bold'}}>

              <p>Loan ID: {loan.loanID}</p>
              <p>Loan User ID: {loan.userId}</p>
              <p>Loan Reason: {loan.reason}</p>
              <p>Loan Initial Amount: ${loan.initialAmount}</p>
              <p>Created on: {loan.creationDate.toString().slice(0, 10)}</p>
              </div>
              <div style={{marginBottom: '35px'}}>
                <Button
                  style={{marginRight: '50px'}}
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleStatus(loan, 'APPROVED')}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleStatus(loan, 'DENIED')}
                >
                  Deny
                </Button>
              </div>
            </div>
          ))
        : ''}
    </Paper>
  );
};

export default AdminLoan;
