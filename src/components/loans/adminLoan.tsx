import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { CreditCard } from '../../models/CreditCard';
import { LoanDetails } from '../../models/LoanDetails';
import { apiGetPendingCreditCards, apiUpdateCreditCardStatus } from '../../remote/banking-api/creditcard.api';
import {
  apiChangeStatus,
  apiGetPendingLoans,
} from '../../remote/banking-api/loan.api';

const AdminLoan = () => {
  const user = useAppSelector((state) => state.user.user);
  const [loans, setLoans] = useState([]);
  const [creditCards, setCreditCards] = useState([]);

  useEffect(() => {
    const getLoans = async () => {
      if (user) {
        let token: string = sessionStorage.getItem('token') || '';
        const response = await apiGetPendingLoans(user.type, token);
        setLoans(response.payload);
      }
    };
    const getCreditCards = async () => {
      if (user) {
        let token: string = sessionStorage.getItem('token') || '';
        const response = await apiGetPendingCreditCards(token);
        setCreditCards(response.payload);
        console.log(response.payload)
      }
    };
    getLoans();
    getCreditCards();
  }, [user]);

  const handleStatus = async (currentLoan: LoanDetails, status: string) => {
    let token: string = sessionStorage.getItem('token') || '';
    currentLoan.status = status;
    const response = await apiChangeStatus(currentLoan, token);
    setLoans(
      loans.filter((x: LoanDetails) => x.loanID !== response.payload.loanID)
    );
  };

    const handleCardStatus = async (currentCard: CreditCard, status: string) => {
      let token: string = sessionStorage.getItem('token') || '';
      currentCard.status = status;
      const response = await apiUpdateCreditCardStatus(currentCard.status, currentCard.id, token);
      setCreditCards(
        creditCards.filter((x: CreditCard) => x.id !== response.payload.id)
      );
    };

  return (
    <Paper style={{ width: '70%', margin: 'auto', backgroundColor: 'primary' }}>
      <Typography variant="h3" style={{ textAlign: 'center' }}>
        Pending Loans
      </Typography>
      {loans.length > 0
        ? loans.map((loan: LoanDetails) => (
            <div
              key={loan.loanID + 1}
              style={{
                textAlign: 'center',
                borderBottom: '3px solid black',
                borderRadius: '5px',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  textAlign: 'left',
                  fontWeight: 'bold',
                }}
              >
                <p>Loan ID: {loan.loanID}</p>
                <p>Loan User ID: {loan.userId}</p>
                <p>Loan Reason: {loan.reason}</p>
                <p>Loan Initial Amount: ${loan.initialAmount}</p>
                <p>Created on: {loan.creationDate.toString().slice(0, 10)}</p>
              </div>
              <div style={{ marginBottom: '35px' }}>
                <Button
                  style={{ marginRight: '50px' }}
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
      <Typography variant="h3" style={{ textAlign: 'center' }}>
        Pending Credit Cards
      </Typography>

      {creditCards.length > 0
        ? creditCards.map((creditCard: CreditCard) => (
            <div
              key={creditCard.id + 1}
              style={{
                textAlign: 'center',
                borderBottom: '3px solid black',
                borderRadius: '5px',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  textAlign: 'left',
                  fontWeight: 'bold',
                }}
              >
                <p>creditCard ID: {creditCard.id}</p>
                <p>creditCard Card Number: {creditCard.cardNumber}</p>
                <p>creditCard CCV: {creditCard.ccv}</p>
                <p>creditCard Initial Amount: ${creditCard.availableBalance}</p>
                <p>
                  Expiration Date: {creditCard.expirationDate.toString().slice(0, 10)}
                </p>
              </div>
              <div style={{ marginBottom: '35px' }}>
                <Button
                  style={{ marginRight: '50px' }}
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleCardStatus(creditCard, 'APPROVED')}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleCardStatus(creditCard, 'DENIED')}
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
