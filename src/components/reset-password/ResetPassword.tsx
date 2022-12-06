import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import bankingClient from '../../remote/banking-api/bankingClient';
import { SyntheticEvent, useState, } from 'react';
import { setDefaultResultOrder } from 'dns';

function ResetPassword(){
    const [submission, setSubmission] = useState<any>({email: '', password: ''});
    const [newPassword, setNewPassword] = useState(''); //used for password CONFIRMATION
    const [error, setError] = useState(false);

    const validate=(value: string, value2: string)=>{
        if(value != value2){
            setError(true);
            //return true;
        } else {
            setError(false);
            //return false;
        }
    }

    const handleChange = (e: SyntheticEvent) => {
      setSubmission({
        ...submission,
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
          .value,
      });
    }
    const handleNewPassChange = (e: SyntheticEvent) => {
        setNewPassword((e.target as HTMLInputElement).value);
    }
    const handleSubmit = () => {
        validate(submission.password, newPassword);
        if(error){
            console.log('your passwords MUST match!');
        } else {
            bankingClient.patch('http://linktogoodbankapi/user/reset-password', submission)
            .then(res=>{
            console.log("api called?."); //of course this is erroring out. Next!
            })
        }
        console.log('I am connected right?');
}
    
    return (
    <div>
        <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
    <h2>Please fill me out to submit a password reset request.</h2>
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={submission.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={submission.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm new password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={newPassword}
            onChange={handleNewPassChange}
          />
          </Box>
          {error ? <p>"Passwords MUST match!"</p> : <></>}
            <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
            >Submit</Button>
            </Box>
    </div>
    )
}

export default ResetPassword;