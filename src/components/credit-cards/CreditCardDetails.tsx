import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import SideBar from "../account-details/SideBar";


export default function CreditCardDetails() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const currentCreditCard = useAppSelector((state) => state.creditCard.currentCreditCard);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
      <div className={'top-container'}>
        <SideBar />
        <div className="account-wrap">
          <div className="account-details">
            <h2>Card Number: {currentCreditCard.cardNumber}</h2>
            <h1>Outstanding Balance: {(currentCreditCard.totalLimit - currentCreditCard.availableBalance)}</h1>
            <Button sx={{ color: 'black', border: '1px solid black' }}
              onClick={() => {
                navigate('/');
              }}
            >
              Back to Accounts
            </Button>
          </div>
        </div>
      </div>
    </>
  )

}