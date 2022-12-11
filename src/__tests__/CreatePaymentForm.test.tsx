import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux";
import { store } from "../app/store";
import CreatePaymentForm from "../components/account-details/CreatePaymentForm"
import { Account } from "../models/Account"
import { User } from "../models/user"
import { setCurrentCreditCard } from "../features/credit/creditCardSlice";
import { apiMakeCreditCardPayment } from "../remote/banking-api/creditcard.api";
//describe is for grouping test cases
describe('Create CC Payment form test suite', () => {
    //beforeAll
    //beforeEach
    //afterAll
    //afterEach
    // let mockSetUserFn = jest.fn().something; this mocks a function

    //test test
    it('Amount to pay starts blank', () => {
        //Arrange
    let stubbedUser : User = {
        id: 1,
        email: "",
        address: "",
        city: "",
        firstName: "",
        lastName: "",
        state: "",
        type: "",
        zip: 0
    }
    let stubbedAccount : Account = {
        id: 5,
        name: "Checking",
        balance: 1000,
        accountType: "Checking",
        creationDate: undefined
    }
    //Act
    //this might need to render CreateCreditCardPayment
    render(<Provider store={store}><CreatePaymentForm currentUser={stubbedUser} setcurrentAccount={stubbedAccount}/></Provider>) 
    //target amount to pay element
    const amountToPayElement = screen.getByText("Amount to Pay");
    //expect to be blank empty
    expect((amountToPayElement as HTMLInputElement).value).toBe(undefined);
    //Assert
    })

    it('Submit payment button calls handleSubmit', () => {
        render(<Provider store={store}><CreatePaymentForm/></Provider>)
    const paymentButton = screen.getByText("Submit Payment?");

    fireEvent.click(paymentButton)

    expect(apiMakeCreditCardPayment).toBeCalled;
    })

    it('Account dropdown on change calls handleChangeAccount', () => {
        render(<Provider store={store}><CreatePaymentForm/></Provider>)
        
        const accountChange = screen.getByText("From Account");

        fireEvent.click(accountChange);

        expect(setAccount).toBeCalled;

    })
});