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
        let token: string = sessionStorage.getItem('token') || "";
        const response = await apiGetPendingLoans(user.type, token);
        console.log(" inside of get loans " + response.payload);

        setLoans(response.payload);
      }
    };
    getLoans();
  }, [user]);
  console.log(" after get loans use effect " + loans);

  const handleStatus = async (currentLoan: LoanDetails, status: string) => {
    let token: string = sessionStorage.getItem('token') || "";
    currentLoan.status = status;
    const response = await apiChangeStatus(currentLoan, token);
    console.log(" inside of handle status " + response.payload);
    setLoans(
      loans.filter((x: LoanDetails) => x.loanID !== response.payload.loanID)
    );
  };
  return (
    <Paper>
      <h1>this is just a test hahahahahahah!!!! (Pending Loans)</h1>
      {loans.length > 0
        ? loans.map((loan: LoanDetails) => (
            <div key={loan.loanID + 1}>
              <p>LoanID: {loan.loanID}</p>
              <p>LoanUserID: {loan.userId}</p>
              <p>LoanReason: {loan.reason}</p>
              <p>LoanInitialAmount: {loan.initialAmount}</p>
              <p>CreationDate: {loan.creationDate.toString()}</p>
              <div>
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
