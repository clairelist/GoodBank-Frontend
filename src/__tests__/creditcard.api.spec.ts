import bankingClient from "../remote/banking-api/bankingClient";
import { apiGetCreditCards, apiGetPendingCreditCards } from "../remote/banking-api/creditcard.api";

jest.mock('../remote/banking-api/bankingClient');
const bankingClientMock = bankingClient as jest.Mocked<typeof bankingClient>;
describe('Credit Card Api test suite', () => {

    it('should return credit cards from user id', async () => {

        (bankingClientMock.get as jest.MockedFunction<typeof bankingClient.get>).mockResolvedValue({
            data: {id: 1},
            status: 200
        });

        const result = await apiGetCreditCards(1, "testtoken43u924");

        expect(bankingClient.get).toHaveBeenCalledWith(
            '/credit-card/1',
            {
                headers: { 'authorization': "testtoken43u924"},
                withCredentials: true
            }
        );
        expect(result.status).toBe(200);
    })

    it('should return pending credit cards', async () => {
        (bankingClientMock.get as jest.MockedFunction<typeof bankingClient.get>).mockResolvedValue({
            status: 201
        });

        const result = await apiGetPendingCreditCards("testtoken242ha");

        expect(bankingClient.get).toHaveBeenCalledWith(
            '/credit-card/get-pending',
            {
                headers: { 'authorization': "testtoken242ha"},
                withCredentials: true
            }
        );
        expect(result.status).toBe(201);
    })
})