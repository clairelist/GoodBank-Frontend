import { Box, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { priceFormatter } from '../../features/util/generalUtils';
import SideBar from '../account-details/SideBar';
import './creditCard.css';
import StyledCreditCard from './StyledCreditCard';

export default function CreditCardDetails() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const currentCreditCard = useAppSelector(
    (state) => state.creditCard.currentCreditCard
  );

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

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
  );
}
