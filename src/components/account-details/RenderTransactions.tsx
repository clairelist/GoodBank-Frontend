import { Box, Button, List, ListItemButton, ListItemText, Popover } from "@mui/material";
import { useState, useEffect } from "react";
import { CreditCardTransaction } from "../../models/CreditCardTransaction";
import { Transaction } from "../../models/Transaction";
import StyledTable from "../account-details/StyledTable";

export default function RenderTransactions(props: CreditCardTransaction[] | Transaction[] | any) {
    const transactions = props.transactions;
    const [anchorEl, setAnchorEl] = useState(null);
    const [page, setPage] = useState(1);
    const [mode, setMode] = useState('RECENT');
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [size, setSize] = useState(0)

    useEffect(() => {
        if(mode != "RECENT") {
            setSize(transactions.filter((x: any) => x.type === mode).length);
        } else {
            setSize(transactions.length);
        }
    }, [mode])

    const generatePageByMode = (currentMode: string) => {
        if(currentMode != "RECENT") {
            let t = transactions
            .filter((x: any) => x.type === currentMode)
            .slice(
                (page - 1) * 5,
                transactions.filter((x: any) => x.type === currentMode).length <= 5
                ? undefined
                : (page - 1) * 5 + 5
            );
            return t;
        } else {
            let t = transactions.slice(
                (page - 1) * 5,
                transactions.length <- 5
                ? undefined
                : (page -1) * 5 + 5
            );
            return t;
        }
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

    return (
        <>
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
                    transaction={generatePageByMode(mode)}
                    page={page}
                    setPage={setPage}
                    transSize={size}
                    mode={mode}
                />
            </div>
        </>
    )
}