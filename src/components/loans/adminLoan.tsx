import { useAppSelector } from '../../app/hooks';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { apiChangeStatus, apiGetPendingLoans } from '../../remote/banking-api/loan.api';
import { LoanDetails } from '../../models/LoanDetails';
import Navbar from '../navbar/Navbar';
import { accountSlice } from '../../features/account/accountSlice';

const AdminLoan = () => {
  const user = useAppSelector((state) => state.user.user);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const getLoans = async () => {
      if (user) {
        const response = await apiGetPendingLoans(user.userType);
        console.log(response.payload);

        setLoans(response.payload);
      }
    };
    getLoans();
  }, [user]);
  console.log(loans);

  const handleStatus = async (currentLoan: LoanDetails, status: string) => {
    currentLoan.status = status;
    const response = await apiChangeStatus(currentLoan);
    console.log(response.payload);
  }

  return( <Paper>
    
    <h1>this is just a test hahahahahahah!!!! (Pending Loans)</h1>
    {loans.length > 0? loans.map((loan:LoanDetails)=>(
    <div key={loan.loanID+1}>
    <p>LoanID: {loan.loanID}</p>
    <p>LoanUserID: {loan.userId}</p>
    <p>LoanReason: {loan.reason}</p>
    <p>LoanInitialAmount: {loan.initialAmount}</p>
    <p>CreationDate: {loan.creationDate.toString()}</p>
    <div>
      <Button variant="outlined" color="primary" size="small" onClick={() => handleStatus(loan, "APPROVED")}>Approve</Button>
      <Button variant="outlined" color="primary" size="small" onClick={() => handleStatus(loan, "DENIED")}>Deny</Button>
    </div>
    </div>
    )):''}
    </Paper>
        );
};

export default AdminLoan;
