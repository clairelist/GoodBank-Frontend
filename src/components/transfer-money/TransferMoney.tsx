import React from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button, InputAdornment } from "@mui/material";
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
// import { SendIcon } from '@mui/icon/material'

export default function transferMoney(){


//get user account and map 

// const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//   event.preventDefault();

//   const response = await 

// }


      return(
        <>
            <div>
                <TextField
                  label="To"
                  id="outlined-to"
                  sx={{ m: 1, width: '25ch' }}
                  variant="outlined"
                />
                <TextField
                  id="outlined-select-account"
                  select
                  label="From"
                  value=""
                  helperText="Select Account"
                  variant="standard"
                >
                </TextField>  

                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                      <Input
                          id="outlined-adornment-amount"
                          value=""
                          startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      />
                  </FormControl>

      
              
                             
            </div>

        </>
    );
}

