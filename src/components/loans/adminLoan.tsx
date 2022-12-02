import { useAppSelector } from '../../app/hooks';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { apiGetPendingLoans } from '../../remote/banking-api/loan.api';
import { LoanDetails } from '../../models/LoanDetails';
import Navbar from '../navbar/Navbar';

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

  return( <div>
    
    <h1>this is just a test hahahahahahah!!!!</h1>
    {loans.length > 0? loans.map((loan:LoanDetails)=>(<div key={loan.id+1}>{loan.id}</div>)):''}
        </div>);
};

export default AdminLoan;
