import { Account } from "../models/Account";
import { apiCreateAccount } from "../remote/banking-api/account.api";
import bankingClient from "../remote/banking-api/bankingClient";

jest.mock('../remote/banking-api/bankingClient');
const bankingClientMock = bankingClient as jest.Mocked<typeof bankingClient>;
describe('Account test suite', () => {
 
    it('Create account should return an Account', async () => {
        (bankingClientMock.post as jest.MockedFunction<typeof bankingClient.post>).mockResolvedValue({
            data: {account: Account},
            status: 200
        });
        

        let stubbedAccount : Account = {
            id: 3,
            name: "Checking",
            balance: 1000,
            accountType: "Checking",
            creationDate: undefined
        }
        const result = await apiCreateAccount (stubbedAccount, '3', '123');

        expect(bankingClient.post).toHaveBeenCalledWith(`/account`, 
            stubbedAccount, {
            headers: { 'authorization': '123' }
            });
        expect(result.status).toBe(200);
});

})