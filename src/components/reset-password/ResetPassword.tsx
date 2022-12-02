import axios from 'axios';
import { SyntheticEvent, useState, } from 'react';

function ResetPassword(props:any){

    const {email} = props;

    const [password, setPassword] = useState("");
    const [submission, setSubmission] = useState({});

    setSubmission({email: email, password: password});

    const handleChange = (e: SyntheticEvent) => { //[(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
      //  .value,
        setPassword((e.target as HTMLInputElement).value);
    }
    const handleSubmit = () => {
        axios.patch('uerl', submission)
        .then(res=>{
        console.log("do something here.");
        })
    }
    
    return (
        <div>
            <h1>I am the RESET PASSWORD COMPONENT!</h1>
            <form onSubmit={handleSubmit}>
                <input 
                
                />
            </form>
        </div>
    )
}

export default ResetPassword;