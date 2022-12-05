//I AM THE TESTS FOR RESET PASSWORD FLOW
import React from 'react';
import { render, screen } from '@testing-library/react';
import ResetPassword from './ResetPassword';
import Login from '../login/Login';

describe('Reset password flow', ()=>{
    it('login page should contain a link to reset password', ()=>{
        //Arrange, Act, Assert
        render(<Login />);

        const aLink = screen.getByText('Forgot password?');

        expect(aLink).toBeInTheDocument();
    });

    it('clicking forgot password should render reset password component', ()=>{

    });

    it('should be able to type in a new password in the field', ()=>{

    });

    it('clicking submit should call axios', ()=>{

    })

})