//I take in an email and password
//and make a PATCH request to the API, to update the password.
//INSTEAD of having user type in their EMAIL here, they will simply
//type and confirm  their PASSWORD

import axios from 'axios';
import { useState } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';

function ResetPassword(props:any){

    const {email} = props;

    const [password, setPassword] = useState("");
    const [submission, setSubmission] = useState({});

    setSubmission({email: email, password: password});

    const handleSubmit = () => {
        axios.patch('uerl', submission)
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