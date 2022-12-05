import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React,{ useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setCurrentCreditCard, setUserCreditCards } from "../../features/credit/creditCardSlice";
import { CreditCard } from "../../models/CreditCard";
import { apiGetCreditCards } from "../../remote/banking-api/creditcard.api";
import { v4 as uuidv4 } from 'uuid';

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
        let token: string = sessionStorage.getItem('token') || "";
        if (user) {
            const result = await apiGetCreditCards(user.id, token);
            dispatch(setUserCreditCards(result.payload));
        }
    };

    let CreditCards = <></>;
    if (!creditCards && user) {
        //If no account in database but logged in, option to create an account appears
        CreditCards = (
            <>
                <Grid
                container
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    direction: 'column',
                    justifyContent: 'center',
                }}
                columns={12}
                >
                <Grid item sm={12} md={12}>
                    <h2 style={{ textAlign: 'center', marginTop: '3%', color: 'gray' }}>
                    You have no credit cards!
                    </h2>
                </Grid>
                {/* <Grid item sm={12} md={12}>
                    <Button
                    onClick={() => {
                        handleChange();
                    }}
                    sx={{ margin: '0 auto', display: 'flex' }}
                    >
                    Open Account
                    </Button>
                </Grid>
                <OpenAccount checked={checked} /> */}
                </Grid>
            </>
            );
        } else if (user) {
            //if logged in and there is an account
            CreditCards = 
            <>
                <Grid
                    container
                    sx={{
                    display: 'flex',
                    alignItems: 'center',
                    direction: 'column',
                    justifyContent: 'center',
                    }}
                    columns={12}
                >
                    <Typography variant="h2" sx={{ marginTop: '20px' }}>
                    Your Credit Cards
                    </Typography>
                    {creditCards?.map((creditCard: CreditCard) => (
                    <React.Fragment key={uuidv4()}>
                        <Grid item mt={2} sm={12} md={12}>
                        <Card sx={{ margin: '0 auto', display: 'flex', maxWidth: '700px' }} key={uuidv4()}>
                            <CardContent>
                            <Typography variant="h3" color="text.secondary">
                                {creditCard.cardNumber}
                            </Typography>
                            
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Credit Card Limit: {creditCard.totalLimit}
                            </Typography>
                            <Button
                                onClick={() => {
                                dispatch(setCurrentCreditCard(creditCard));
                                navigate('/credit-card-details');
                                }}
                            >
                                Account Details
                            </Button>
                            <Typography
                                variant="h5"
                                sx={{ display: 'flex', justifyContent: 'flex-end' }}
                            >
                                Balance: {creditCard.availableBalance}
                            </Typography>
                            </CardContent>
                        </Card>
                        </Grid>
                    </React.Fragment>
                    ))}
        
                    {/* <Grid item sm={12} md={12}>
                    <h2 style={{ textAlign: 'center', marginTop: '3%', color: 'gray' }}>
                        Create a new account!
                    </h2>
                    </Grid> */}
                    {/* <Grid item sm={12} md={12}>
                    <Button
                        onClick={() => {
                        handleChange();
                        }}
                        sx={{ margin: '0 auto', display: 'flex' }}
                    >
                        Open A New Account
                    </Button>
                    </Grid>
                    <OpenAccount checked={checked} /> */}
                </Grid>
            </>
        ;
        
      }

    return <>{CreditCards}</>
}