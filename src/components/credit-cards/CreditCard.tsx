import {
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setUserCreditCards } from '../../features/credit/creditCardSlice';
import { CreditCard } from '../../models/CreditCard';
import { apiGetCreditCards } from '../../remote/banking-api/creditcard.api';
import StyledCreditCard from './StyledCreditCard';

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
          <StyledCreditCard key={creditCard.id} creditCard={creditCard} />
        ))}
      </Stack>
    </>
  );
}
