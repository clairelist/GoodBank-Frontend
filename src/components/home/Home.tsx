import Accounts from '../account-details/Accounts';
import CreditCard from '../credit-cards/CreditCard';
import Loans from '../account-details/Loans';
import { Container, Divider, SxProps, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';

export const cardStyles: SxProps = {
  margin: '0 auto',
  display: 'flex',
  width: '25vw',
  backgroundColor: '#9F86C0',
  color: 'white'
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

  return (
    <>
      <Container sx={containerStyles} maxWidth="xl">
        <Typography sx={{ fontSize: 34, color: '#5E548E' }}>
          Welcome back, {user?.firstName}!
        </Typography>
      </Container>
      <Divider variant="middle" />
      <Container sx={containerStyles} maxWidth="xl">
        <Accounts />
        <CreditCard />
        <Loans />
      </Container>
    </>
  );
}
