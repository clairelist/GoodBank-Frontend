import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  setCurrentCreditCard,
  setUserCreditCards,
} from '../../features/credit/creditCardSlice';
import { CreditCard } from '../../models/CreditCard';
import { apiGetCreditCards } from '../../remote/banking-api/creditcard.api';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Add } from '@mui/icons-material';
import { cardButtonStyles, cardStyles } from '../home/Home';
import { priceFormatter } from '../../features/util/generalUtils';

export default function CreditCards() {
  const user = useAppSelector((state) => state.user.user);
  const creditCards = useAppSelector((state) => state.creditCard.creditCards);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      fetchData();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  const fetchData = async () => {
    let token: string = sessionStorage.getItem('token') || '';
    if (user) {
      const result = await apiGetCreditCards(user.id, token);
      dispatch(setUserCreditCards(result.payload));
    }
  };

  if (!creditCards) return <></>;
  return (
    <>
      <Stack spacing={2} sx={{ alignItems: 'center' }}>
        <Typography sx={{ fontSize: 22, color: '#5E548E' }}>
          Credit Cards:
        </Typography>

        {creditCards?.map((creditCard: CreditCard) => (
          <Card key={creditCard.id} sx={cardStyles} variant="outlined">
            <CardContent>
              <CreditCardIcon>
                <Add sx={{ fontSize: '80px' }} />
              </CreditCardIcon>
              <Typography variant="h3">{creditCard.cardNumber}</Typography>

              <Typography sx={{ mb: 1.5 }}>
                Credit Card Limit: {priceFormatter.format(creditCard.totalLimit)}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  onClick={() => {
                    dispatch(setCurrentCreditCard(creditCard));
                    navigate('/credit-card-details');
                  }}
                  sx={cardButtonStyles}
                >
                  Details
                </Button>
                <Typography variant="h5">
                  Balance: {priceFormatter.format(creditCard.availableBalance)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  );
}
