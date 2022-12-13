import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import  Loan  from "../components/loans/loan";
import { LoanDetails } from '../models/LoanDetails';
import Loans from '../components/account-details/Loans';
import { apiCreateLoan } from '../remote/banking-api/loan.api';
import { useNavigate } from 'react-router-dom';
// import renderer from 'react-test-renderer';

// jest.mock('../remote/banking-api/loan.api', () => {
//     return jest.fn(() => <div>Submit</div>)
// })

// const render = component => rtlRender(
//     <Provider store={store}>
//         {component}
//     </Provider>
// )

// jest.mock('../remote/banking-api/loan.api');
jest.mock;

// jest.mock('./Children', () => {
//     return jest.fn(() => <div>mocked child</div>);
//   });
// const mockedUsedNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//    ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedUsedNavigate,
// }));

// describe('LoanAPI component test suite', () => {


//     it('should invoke the loanAPI.createLoan method when the button is clicked', () => {
//         // Arrange
//         // test('reducers', () => {
//         //     let state;
//         //     state = reducers({user:{currentUser:{id: 1, email: 'test@gmail.com', address: '1234 Tampa Way', city: 'Tampa', firstName: 'John', lastName: 'Doe', state: 'Florida', zip: 57624}}})
//         //     expect(state).toEqual({user:{currentUser:{id: 1, email: 'test@gmail.com', address: '1234 Tampa Way', city: 'Tampa', firstName: 'John', lastName: 'Doe', state: 'Florida', zip: 57624}}})
//         // })
//         let stubbedUser = {
//             id: 1,
//             email: 'test@gmail.com',
//             address: '1234 tampa way',
//             city: 'Tampa Bay',
//             firstName: 'Bryan',
//             lastName: 'Serfozo',
//             state: 'Florida',
//             zip: '30122'
//         };
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
        
//         let onClick = jest.fn();
//         // test('reducers', () => {
//         //     let state;
//         //     state = reducers({account:{currentAccount:{id:0,name:'',balance:0,accountType:'',creationDate:''},userAccounts:[{id:1,name:'Primary Checking',balance:10000,creationDate:'2022-08-25T20:32:26.568+00:00',accountType:'CHECKING'}],accountTransactions:[],transferType:''},user:{user:{id:1,email:'testuser@gmail.com',firstName:'Bryan',lastName:'Serfozo',address:'1234 Tampa Ave',state:'Florida',city:'Tampa',zip:57624,type:'CLIENT'},status:'idle'},creditCard:{currentCreditCard:{id:0,cardNumber:0,ccv:0,expirationDate:'',totalLimit:0,availableBalance:0},creditCards:[{id:1,cardNumber:1234123412341234,ccv:765,expirationDate:'2022-08-25T20:32:26.568+00:00',totalLimit:15000,availableBalance:15000},{id:3,cardNumber:4567456745674568,ccv:783,expirationDate:'2022-08-25T20:32:26.568+00:00',totalLimit:10000,availableBalance:5000}]},creditCardTransaction:{currentCreditCardTransaction:{id:0,amount:0,description:'',type:'',creditCardId:0,accountId:0},creditCardTransactions:[]},notifications:{list:[{id:'a',type:'INFORMATION',referencesId:null,body:'testing...',dismissed:false,seen:false,time:'2022-08-25T20:32:26.568+00:00'},{id:'b',type:'INFORMATION',referencesId:null,body:'testing again...',dismissed:false,seen:false,time:'2022-08-25T20:32:26.568+00:00'},{id:'c',type:'INFORMATION',referencesId:null,body:'dismiss me, i dare you',dismissed:false,seen:false,time:'2022-08-25T20:32:26.568+00:00'}],ticker:24,status:'idle'}}, {type:'notifications/setUserNotifications',payload:[{id:'a',type:'INFORMATION',referencesId:null,body:'testing...',dismissed:false,seen:false,time:'2022-08-25T20:32:26.568+00:00'},{id:'b',type:'INFORMATION',referencesId:null,body:'testing again...',dismissed:false,seen:false,time:'2022-08-25T20:32:26.568+00:00'},{id:'c',type:'INFORMATION',referencesId:null,body:'dismiss me, i dare you',dismissed:false,seen:false,time:'2022-08-25T20:32:26.568+00:00'}]});
//         //     expect(state).toEqual({account:{currentAccount:{id:0,name:'',balance:0,accountType:'',creationDate:''},userAccounts:[{id:1,name:'Primary Checking',balance:10000,creationDate:'2022-08-25T20:32:26.568+00:00',accountType:'CHECKING'}],accountTransactions:[],transferType:''},user:{user:{id:1,email:'testuser@gmail.com',firstName:'Bryan',lastName:'Serfozo',address:'1234 Tampa Ave',state:'Florida',city:'Tampa',zip:57624,type:'CLIENT'},status:'idle'},creditCard:{currentCreditCard:{id:0,cardNumber:0,ccv:0,expirationDate:'',totalLimit:0,availableBalance:0},creditCards:[{id:1,cardNumber:1234123412341234,ccv:765,expirationDate:'2022-08-25T20:32:26.568+00:00',totalLimit:15000,availableBalance:15000},{id:3,cardNumber:4567456745674568,ccv:783,expirationDate:'2022-08-25T20:32:26.568+00:00',totalLimit:10000,availableBalance:5000}]},creditCardTransaction:{currentCreditCardTransaction:{id:0,amount:0,description:'',type:'',creditCardId:0,accountId:0},creditCardTransactions:[]},notifications:{list:[{id:'a',type:'INFORMATION',referencesId:null,body:'testing...',dismissed:false,seen:false,time:'2022-08-25T20:32:26.568+00:00'},{id:'b',type:'INFORMATION',referencesId:null,body:'testing again...',dismissed:false,seen:false,time:'2022-08-25T20:32:26.568+00:00'},{id:'c',type:'INFORMATION',referencesId:null,body:'dismiss me, i dare you',dismissed:false,seen:false,time:'2022-08-25T20:32:26.568+00:00'}],ticker:24,status:'idle'}});
//         //   });
//         // let state;
//         // state = reducers({user:{currentUser:{id: 1, email: 'test@gmail.com', address: '1234 Tampa Way', city: 'Tampa', firstName: 'John', lastName: 'Doe', state: 'Florida', zip: 57624}}})
        
//         //Act 
//         render((<Provider store={store}><Loan/></Provider>))
//         // const loanInputAmount = screen.getByLabelText('amount');
//         // const loanInputReason = screen.getByLabelText('reason');
//         // const submitButton = screen.getByText('Submit');
//         // const loanPage = screen.getByTestId('test1');


//         // fireEvent.change(loanInputAmount, {target: {value: '2500'}});
//         // fireEvent.change(loanInputReason, {target: {value: 'Testing'}});
//         fireEvent.click(screen.getByText('Approval'));

//         //Assert
//         expect(apiCreateLoan).toBeCalledTimes(1);
//         // expect(loanPage).toBeInTheDocument();
//     });

//     // it('should render all loans that are connected to the logged in user',  () => {
//     //     // Arrange
//     //     let stubbedUser = (
//     //         id: 1,
//     //         email: 'test@gmail.com',
//     //         address: '1234 tampa way',
//     //         city: 'Tampa Bay',
//     //         firstName: 'Bryan',
//     //         lastName: 'Serfozo',
//     //         state: 'Florida',
//     //         zip: '30122'
//     //     );
//     //     let stubbedLoan = undefined;
//     //     let mockSetLoanFn = jest.fn();

//     //     //Act
//     //     render(<loan.api currentLoan={stubbedLoan} setCurrentLoan={mockSetLoanFn} />);
//     //     const loanInputAmount = screen.getByPlaceholderText('Amount*');
//     //     const loanInputReason = screen.getByPlaceholderText('Reason*');

//     //     fireEvent.change(loanInputAmount, {target: {value: '2500'}});
//     //     fireEvent.change(loanInputReason, {target: {value: 'Testing'}});
//     //     fireEvent.click(screen.getByText('Submit'));

//     //     //Assert
//     //     expect('Your Loans').toBeInTheDocument();
//     // });
// })

// // function reducers(arg0: { user: { currentUser: { id: number; email: string; address: string; city: string; firstName: string; lastName: string; state: string; zip: number; }; }; }): any {
// //     throw new Error('Function not implemented.');
// // }

// test('LoanAPI test suite', () => {
//     render(<Loan />)
// })
