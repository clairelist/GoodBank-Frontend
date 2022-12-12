import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "../App";
import { store } from "../app/store";
import Loan from "../components/loans/loan";
import Login from "../components/login/Login";
jest.mock('../remote/banking-api/loan.api.ts');
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));



describe('Loan component test suite', () => {

    it('should render successfully as admin', () => {

        render(
            <Provider store={store}>
                <Loan />
            </Provider>
        );

        const textElement = screen.getByText('Pending Loans');

        expect(textElement).toBeInTheDocument();
    })

});
