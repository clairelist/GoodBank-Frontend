import React from 'react';
import Accounts from '../account-details/Accounts';
import CreditCard from '../credit-cards/CreditCard';
import Loans from '../account-details/Loans';

//Fixed merge conflict
export default function Home() {

  return (
    <>
      <Accounts />
      <CreditCard />
      <Loans />
    </>
  )
}
