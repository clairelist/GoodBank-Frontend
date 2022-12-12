import { Box, Button, List, ListItemButton, ListItemText, Popover, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setUserCreditCardTransactions } from "../../features/credit/creditCardTransactionSlice";
import { apiGetCreditCardTransactions } from "../../remote/banking-api/creditcard.api";
import SideBar from "../account-details/SideBar";
import StyledTable from "../account-details/StyledTable";
import { priceFormatter } from '../../features/util/generalUtils';
import './creditCard.css';
import StyledCreditCard from './StyledCreditCard';

export default function CreditCardDetails() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const currentCreditCard = useAppSelector((state) => state.creditCard.currentCreditCard);
  const transactions = useAppSelector((state) => state.creditCardTransaction.creditCardTransactions)
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(1);
  const [transSize, setTransSize] = useState(0);
  const [mode, setMode] = useState('RECENT');

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      fetchTransactions();
    }
  }, [user, navigate]);

  const fetchTransactions = async () => {
    let token: string = sessionStorage.getItem('token') || '';
    const result = await apiGetCreditCardTransactions(token, currentCreditCard.id);
    if(result.status === 200) {
      dispatch(setUserCreditCardTransactions(result.payload));
    }
  }

  const generatePageByMode = (currentMode: string) => {
    return transactions
      .filter((x) => x.type === currentMode)
      .slice(
        (page - 1) * 5,
        transactions.filter((x) => x.type === currentMode).length <= 5
          ? undefined
          : (page - 1) * 5 + 5
      );
  };

  const changeMode = (newMode: string) => {
    if (newMode.toLowerCase() !== mode.toLowerCase()) {
      setPage(1);
      setMode(newMode);
    }
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-US');
  const formatNum = (n: number) => {
    // adding the spaces in the card number
    const input = n.toString();
    let output = '';
    let counter = 0;
    for (let i = 0; i < input.length; i++){
      let strToAdd = input[i];
      counter++;
      if (counter >= 4) {
        strToAdd += ' ';
        counter = 0;
      }
      output += strToAdd;
    }
    return output;
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SideBar />

        <Stack spacing={2} sx={{ alignItems: 'center', mt: '4em' }}>
          <StyledCreditCard creditCard={currentCreditCard} />
        </Stack>
        
        <Stack spacing={2} sx={{ mt: '4em', mx: '1em', color: "#5E548E" }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: '1em', borderBottom: '1px solid #E0B1CB' }}>
            <Typography>CARD NUMBER:</Typography>
            <Typography sx={{ml: '1em'}}> {formatNum(currentCreditCard.cardNumber)} </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: '1em', borderBottom: '1px solid #E0B1CB' }}>
            <Typography>CCV:</Typography>
            <Typography> {currentCreditCard.ccv} </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: '1em', borderBottom: '1px solid #E0B1CB' }}>
            <Typography>EXPIRATION DATE:</Typography>
            <Typography> {formatDate(currentCreditCard.expirationDate)}  </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: '1em', borderBottom: '1px solid #E0B1CB' }}>
            <Typography>REMAINING BALANCE:</Typography>
            <Typography> {priceFormatter.format((currentCreditCard.totalLimit - currentCreditCard.availableBalance))}  </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: '1em', borderBottom: '1px solid #E0B1CB' }}>
            <Typography>LIMIT:</Typography>
            <Typography> {priceFormatter.format(currentCreditCard.totalLimit)}  </Typography>
          </Box>
          {currentCreditCard.status ? 
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>ACCOUNT STATUS:</Typography>
              <Typography> {currentCreditCard.status} </Typography>
            </Box>
          : ''}
        </Stack>
      </Box>

      <div className="txn-wrap">
        <div style={{ display: 'flex', width: '100%', alignItems: 'center', color: '#5E548E' }}>
          <h1 className="title">Recent Transactions</h1>
          <Button
            variant="contained"
            aria-describedby={id}
            sx={{ marginLeft: 'auto' }}
            onClick={handleClick}
          >
            Sort by: {mode}
          </Button>
          <Popover
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            >
              <div aria-label="notifications">
                <List>
                  <ListItemButton>
                    <ListItemText
                      primary={'Recent'}
                      onClick={() => changeMode('RECENT')}
                    />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText
                      primary={'Income'}
                      onClick={() => changeMode('INCOME')}
                    />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText
                      primary={'Expenses'}
                      onClick={() => changeMode('EXPENSE')}
                    />
                  </ListItemButton>
                </List>
              </div>
            </Box>
          </Popover>
        </div>

        <StyledTable
          transaction={
            mode === 'RECENT'
              ? transactions
              : mode === 'EXPENSE'
                ? generatePageByMode('EXPENSE')
                : generatePageByMode('INCOME')
          }
          page={page}
          setPage={setPage}
          transSize={
            mode === 'RECENT'
              ? transSize
              : mode === 'EXPENSE'
                ? transactions.filter((x) => x.type === 'EXPENSE').length
                : transactions.filter((x) => x.type === 'INCOME').length
          }
          mode={mode}
        />
      </div>
    </>


  );
}
