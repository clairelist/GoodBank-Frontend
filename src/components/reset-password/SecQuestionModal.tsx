import bankingClient from '../../remote/banking-api/bankingClient';
import { SyntheticEvent, useState, useRef, useEffect, } from 'react';
import {useNavigate} from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { setDefaultResultOrder } from 'dns/promises';

interface IResetProps {
    email: string,
    password: string,
    securityAnswer: string
}

function SecurityQuestion(props: any){
    //const {email: email, password: password, securityAnswer: securityAnswer} = props;
    // const [submission, setSubmission] = useState({
    //   email: props.email,
    //   password: props.password,
    //   securityAnswer: props.securityAnswer
    // })
    const [secQuestion, setSecQuestion] = useState<any>('');
    const [confirm, setConfirm] = useState(false);
    const [secAnswer, setSecAnswer] = useState<any>('');
    const [error, setError] = useState('');
    const handleSecurityGet = useRef(()=>{});
    const navigate = useNavigate();

    const navAfterTime = () => { 
      //@DOCS: used for the timeout, below, so our confirm message is displayed.
      navigate('/login');
  }

    handleSecurityGet.current = () => {
        //@DOCS: I SEND A POST REQUEST, but the function is called get because it "gets" the 
        //security question from the server ie.
        bankingClient.post('user/reset-password', props)
          .then(res=>{
            setSecQuestion(res.data);
          }).catch(err=>{
            //console.log(err + '___->handle this error somehow!')
          })
      }
  
      //on pageload, get the security question.
      //pass user info (email, new password) BE SURE TO GET PROPS IN HERE!
      useEffect(()=>{
        handleSecurityGet.current();
        //console.log(props.email);
      }, [])

      const handleChange = (e: SyntheticEvent) => {
        setSecAnswer((e.target as HTMLInputElement).value);
      }

      const patchObject = {
        email: props.email,
        password: props.password,
        confirmPassword: props.password,
        securityAnswer: secAnswer
      }
      const handleSubmit=()=>{
        bankingClient.patch('/user/reset-password', patchObject)
          .then(res=>{
            if (res.status === 400){
                setError('Oops, that was not the correct security answer. Please try again.')
            } else {
                setConfirm(true);
                setTimeout(navAfterTime, 1000);
            }
          })
          .catch(err=>{
              // setError(true);
          })
      }
      
      const emailString = props[0];

    return(

        <div>
        <h2>Please enter your Good security answer.</h2>
        <p>{secQuestion}</p>
        <p style={{color:'red'}}>{error}</p>
        <TextField
            margin="normal"
            required
            fullWidth
            name="securityAnswer"
            label="Type answer here."
            id="securityPassword"
            value={secAnswer}
            onChange={handleChange}
          />
          {confirm ? 
          <p>Your password has been RESET. Please wait to be redirected to login.</p>
           :  
          <Button
          type="submit"
          color="warning"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
          >Verify your identity & reset password.
          </Button>
        }
        </div>
    )
}

export default SecurityQuestion;