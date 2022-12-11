import { Add } from '@mui/icons-material';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentCreditCard } from '../../features/credit/creditCardSlice';
import { priceFormatter } from '../../features/util/generalUtils';
import { CreditCard } from '../../models/CreditCard';
import ContactlessIcon from '@mui/icons-material/Contactless';
import { cardButtonStyles, cardStyles } from '../home/Home';
import './creditCard.css';
import userEvent from '@testing-library/user-event';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface IProps {
  creditCard: CreditCard;
}

export default function StyledCreditCard(props: IProps) {
  const { creditCard } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  const formatCardNumber = (cardNum: number) => {
    const numString = cardNum.toString();
    const len = numString.length;
    return numString.slice(len - 4, len);
  };

  const formatExpiryDate = (dateString: string) => {
    const d = new Date(dateString);
    const month = d.getMonth().toString();
    const year = d.getFullYear().toString();

    return `${month}/${year.slice(year.length - 2, year.length)}`;
  };

  return (
    <Card key={creditCard.id} sx={{ borderRadius: '16px' }} variant="outlined">
      <div className="credit-card">
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginY: '1em'
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: '600',
                fontSize: '1rem',
              }}
            >
              BALANCE: {priceFormatter.format(creditCard.availableBalance)}{' '}
              <br />
              LIMIT: {priceFormatter.format(creditCard.totalLimit)}
            </Typography>

            <Button
              onClick={() => {
                dispatch(setCurrentCreditCard(creditCard));
                navigate('/credit-card-details');
              }}
              sx={cardButtonStyles}
            >
              Details
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ContactlessIcon fontSize="large" />
            <img className="card-image" src="chip.png" />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="card-number">****</span>
            <span className="card-number">****</span>
            <span className="card-number">****</span>
            <span className="card-number">
              {formatCardNumber(creditCard.cardNumber)}
            </span>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>
              {user?.firstName.toUpperCase()} {user?.lastName.toUpperCase()}
            </span>
            <span>{formatExpiryDate(creditCard.expirationDate)}</span>
          </Box>
        </CardContent>
      </div>
    </Card>
  );
}
