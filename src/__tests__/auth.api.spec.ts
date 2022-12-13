import { apiLogin } from "../remote/banking-api/auth.api";
import bankingClient from "../remote/banking-api/bankingClient";

jest.mock('../remote/banking-api/bankingClient');
const bankingClientMock = bankingClient as jest.Mocked<typeof bankingClient>;
describe('Create CC Payment form test suite', () => {


    it('Should return user', async () => {
        // mock recieving 
    (bankingClientMock.post as jest.MockedFunction<typeof bankingClient.post>).mockResolvedValue({
        data: {email: 'test@test.com', password: 'pass'},
        status: 200
    });

    //mock calling function
    const result = await apiLogin ('test@test.com', 'pass');
    
    //expected
    expect(bankingClient.post).toHaveBeenCalledWith(`/auth/login`,
    { email: 'test@test.com', password: 'pass' });
    expect(result.status).toBe(200);
    expect(result.payload).toEqual({email: 'test@test.com', password: 'pass'});

    }
    );
}
    )