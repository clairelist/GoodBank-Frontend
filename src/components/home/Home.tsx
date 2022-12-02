import React from 'react';
import Accounts from '../account-details/Accounts';
import Loans from '../account-details/Loans';


export default function Home() {

  return (
    <>
      <Accounts />
      {/* <CreditCards /> */}
      <Loans />
    </>
  )
}
