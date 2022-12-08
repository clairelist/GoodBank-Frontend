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
    <Paper>
      <h1 style={{textAlign: 'center'}}>Pending Loans</h1>
      {loans.length > 0
        ? loans.map((loan: LoanDetails) => (
            <div key={loan.loanID + 1} style={{borderBottom:'1px solid black', borderRadius: '5px'}}>
              <p>LoanID: {loan.loanID}</p>
              <p>LoanUserID: {loan.userId}</p>
              <p>LoanReason: {loan.reason}</p>
              <p>LoanInitialAmount: {loan.initialAmount}</p>
              <p>CreationDate: {loan.creationDate.toString()}</p>
              <div style={{marginBottom: '15px'}}>
                <Button
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
