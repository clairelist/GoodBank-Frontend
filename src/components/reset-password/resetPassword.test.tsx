//I AM THE TESTS FOR RESET PASSWORD FLOW
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResetPassword from './ResetPassword';
import Login from '../login/Login';
import calls from '../../remote/banking-api/bankingClient';

jest.mock('../../remote/banking-api/bankingClient');

describe('Reset password flow', ()=>{
    it('login page should contain a link to reset password', ()=>{
        render(<Login />);
        let aLink = screen.getByText('Forgot password?');
        expect(aLink).toBeInTheDocument();
    });

    it('clicking forgot password should render reset password component', ()=>{
        render(<Login />);
        fireEvent.click(screen.getByText('Forgot password?'));
        let mockPass = screen.getByLabelText('password');
        expect(mockPass).toBeInTheDocument();
    });

    it('should be able to type in a new password in the field', ()=>{
        render(<ResetPassword />);
        let mockField = screen.getByLabelText('password');
        fireEvent.change(mockField, {target: {value: 'marimite'}});
        expect((mockField as HTMLInputElement).value).toBe('marimite');
    });

    it('clicking submit should call axios', ()=>{
        render(<ResetPassword />);
        fireEvent.click(screen.getByText('Submit'));
        expect(calls).toBeCalledTimes(1);
    });
});