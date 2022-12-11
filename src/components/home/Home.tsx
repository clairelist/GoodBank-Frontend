import Accounts from '../account-details/Accounts';
import CreditCard from '../credit-cards/CreditCard';
import Loans from '../account-details/Loans';
import { Container, Divider, SxProps, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { chooseWelcomeMessage } from '../../features/util/generalUtils';
import { Navigate } from 'react-router-dom';
import './homeStyles.css';

export const cardStyles: SxProps = {
  margin: '0 auto',
  display: 'flex',
  width: '25vw',
  minWidth: '400px',
  backgroundColor: '#9F86C0',
  color: 'white',
  borderRadius: '16px'
};

export const cardButtonStyles: SxProps = {
  backgroundColor: 'white',
  ":hover": {
      color: 'white',
  }
}

export const containerStyles: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
};

//Fixed merge conflict
export default function Home() {
  
  const user = useAppSelector((state) => state.user.user);
  
  if (!user) return <Navigate to="/login" />

  return (
    <>
      <div className='welcome-background'>
        <Container sx={containerStyles} maxWidth="xl">
          <Typography sx={{ fontSize: 34, color: '#5E548E', marginY: '2em'}}>
            {chooseWelcomeMessage(user.firstName)}
          </Typography>
        </Container>
      </div>
      <div className='page-background'>
        <Container sx={containerStyles} maxWidth="xl">
          <Accounts />
          <CreditCard />
          <Loans />
        </Container>
      </div>
    </>
  );
}
