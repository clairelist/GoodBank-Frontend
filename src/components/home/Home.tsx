import Accounts from '../account-details/Accounts';
import CreditCard from '../credit-cards/CreditCard';
import Loans from '../account-details/Loans';
import { Container, SxProps } from '@mui/material';

//Fixed merge conflict
export default function Home() {

  const containerStyles: SxProps = {
    display: 'flex',
    width: '100%',
    justifyItems: 'space-between'
  }
  
  return (
    <Container sx={containerStyles}>
      <Accounts />
      <CreditCard />
      <Loans />
    </Container>
  )
}