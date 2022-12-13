import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import  Loan  from "../components/loans/loan";
import { LoanDetails } from '../models/LoanDetails';
import Loans from '../components/account-details/Loans';
import { apiCreateLoan } from '../remote/banking-api/loan.api';


describe('LoanAPI test suite', () => {
    it('Shows a user all of their current loans', () => {
        let stubbedLoan : LoanDetails = {
            userId: 1,
            loanID: 1,
            reason: '',
            initialAmount: 0,
            balance: 0,
            creationDate: undefined,
            status: ''
        };

        render(<Provider store={store}><Loans/></Provider>); 
        const textField = screen.getByText('Your Loans');
        expect(textField).toBeInTheDocument;
    })

    it('Should invoke the create loan function', () => {
        render(<Provider store={store}><Loan/></Provider>);
        const submitButton = screen.getByText('Submit'); 
        fireEvent.click(submitButton);
        expect(apiCreateLoan).toBeCalledTimes(1);
    })

    it('Should throw an error if the form is invalid', () => {
        render(<Provider store={store}><Loan/></Provider>);
        const loanInputAmount = screen.getByLabelText('amount');
        const loanInputReason = screen.getByLabelText('reason');
        const submitButton = screen.getByText('Submit');
        fireEvent.change(loanInputAmount, {target: {value: ''}});
        fireEvent.change(loanInputReason, {target: {value: ''}});
        fireEvent.click(submitButton);
        expect('Fields cannot be empty').toBeInTheDocument();
    })
    
})

