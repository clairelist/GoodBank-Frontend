import { Box, Stack, Typography } from "@mui/material";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setUserCreditCardTransactions } from "../../features/credit/creditCardTransactionSlice";
import { apiGetCreditCardTransactions } from "../../remote/banking-api/creditcard.api";
import SideBar from "../account-details/SideBar";
import { priceFormatter } from '../../features/util/generalUtils';
import './creditCard.css';
import StyledCreditCard from './StyledCreditCard';
import RenderTransactions from "../account-details/RenderTransactions";

export default function CreditCardDetails() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const currentCreditCard = useAppSelector((state) => state.creditCard.currentCreditCard);
  const transactions = useAppSelector((state) => state.creditCardTransaction.creditCardTransactions)
  
  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      fetchTransactions();
    }
  }, [user, navigate, currentCreditCard]);

  const fetchTransactions = async () => {
    let token: string = sessionStorage.getItem('token') || '';
    const result = await apiGetCreditCardTransactions(token, currentCreditCard.id);
    if(result.status === 200) {
      dispatch(setUserCreditCardTransactions(result.payload));
    }
  }

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-US');
  const formatNum = (n: number) => {
    // adding the spaces in the card number
    const input = n.toString();
    let output = '';
    let counter = 0;
    for (let i = 0; i < input.length; i++){
      let strToAdd = input[i];
      counter++;
      if (counter >= 4) {
        strToAdd += ' ';
        counter = 0;
      }
      output += strToAdd;
    }
    return output;
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SideBar />

        <Stack spacing={2} sx={{ alignItems: 'center', mt: '4em' }}>
          <StyledCreditCard creditCard={currentCreditCard} />
        </Stack>
        
        <Stack spacing={2} sx={{ mt: '4em', mx: '1em', color: "#5E548E" }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: '1em', borderBottom: '1px solid #E0B1CB' }}>
            <Typography>CARD NUMBER:</Typography>
            <Typography sx={{ml: '1em'}}> {formatNum(currentCreditCard.cardNumber)} </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: '1em', borderBottom: '1px solid #E0B1CB' }}>
            <Typography>CCV:</Typography>
            <Typography> {currentCreditCard.ccv} </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: '1em', borderBottom: '1px solid #E0B1CB' }}>
            <Typography>EXPIRATION DATE:</Typography>
            <Typography> {formatDate(currentCreditCard.expirationDate)}  </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: '1em', borderBottom: '1px solid #E0B1CB' }}>
            <Typography>REMAINING BALANCE:</Typography>
            <Typography> {priceFormatter.format((currentCreditCard.totalLimit - currentCreditCard.availableBalance))}  </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: '1em', borderBottom: '1px solid #E0B1CB' }}>
            <Typography>LIMIT:</Typography>
            <Typography> {priceFormatter.format(currentCreditCard.totalLimit)}  </Typography>
          </Box>
          {currentCreditCard.status ? 
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>ACCOUNT STATUS:</Typography>
              <Typography> {currentCreditCard.status} </Typography>
            </Box>
          : ''}
        </Stack>
      </Box>

      <RenderTransactions transactions={transactions} />
    </>


  );
}
