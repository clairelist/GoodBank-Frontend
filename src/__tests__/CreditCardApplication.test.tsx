import {render} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import CreditCardApplication from '../components/credit-cards/CreditCardApplication';

const mockedUsedNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
    }));

describe('Credit Card Application Form test suite', () => {

    it('should verify user is not logged in', () => {
        const {getByText} = render(<Provider store={store}><CreditCardApplication /></Provider>);
        const titleValue = getByText('Pending Loans');
        expect(titleValue).toHaveTextContent('Pending Loans');
    })

})