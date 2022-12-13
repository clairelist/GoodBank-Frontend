import bankingClient from "../remote/banking-api/bankingClient";
import { apiGetUserNotifications } from "../remote/banking-api/notification.api";

jest.mock('../remote/banking-api/bankingClient');
const bankingClientMock = bankingClient as jest.Mocked<typeof bankingClient>;
describe('Notification test suite', () => {
 
    it('Get user notifications should return notifications', async () => {
        (bankingClientMock.get as jest.MockedFunction<typeof bankingClient.get>).mockResolvedValue({
            data: {userId: 3},
            status: 200
        });
        
        const result = await apiGetUserNotifications(3);

        expect(bankingClient.get).toHaveBeenCalledWith(`/notification/3`);
        expect(result.status).toBe(200);
    });
    
})