import { Box, Button, List, ListItemButton, ListItemText, Popover } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { apiGetCreditCardTransactions } from "../../remote/banking-api/creditcard.api";
import SideBar from "../account-details/SideBar";
import StyledTable from "../account-details/StyledTable";


export default function CreditCardDetails() {
  const navigate = useNavigate();
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
      let token: string = sessionStorage.getItem('token') || '';
      const result = await apiGetCreditCardTransactions(token, currentCreditCard.id);
      
    }
  }, [user, navigate]);

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
  )

}