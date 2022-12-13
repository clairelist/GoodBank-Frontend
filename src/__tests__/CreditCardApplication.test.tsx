import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import CreditCardApplication from '../components/credit-cards/CreditCardApplication';
import configureStore from 'redux-mock-store';

const mockedUsedNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
    }));

describe('Credit Card Application Form test suite', () => {
    // beforeEach(() => {
    //     const verify = jest.spyOn(jwt, 'verify');
    //     verify.mockImplementation(() => () => ({ verified: 'true' }));
    // })
    // });
    it('Requested Amount starts out blank', () => {
        render(<Provider store={store}><CreditCardApplication/></Provider>);
        const requestedAmount = screen.getByDisplayValue("Requested Amount*");
        expect((requestedAmount as HTMLInputElement).value).toBeUndefined;
        // expect(documentBody.getByText("Requested Amount*")).toBeInTheDocument()
        
    })

})