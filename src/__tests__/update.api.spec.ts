import bankingClient from "../remote/banking-api/bankingClient";
import { apiUpdate } from '../remote/banking-api/update.api';
import { UserUpdateRequest } from '../models/user';

jest.mock('../remote/banking-api/bankingClient');
const bankingClientMock = bankingClient as jest.Mocked<typeof bankingClient>;

describe('Update user information', () => {
  it('Should return updated user information', async () => {
    (bankingClientMock.patch as jest.MockedFunction<typeof bankingClient.patch>).mockResolvedValue({
      status: 200
    })

    let token = "token";
    let testuser: UserUpdateRequest = {
      id: 1,
      email: "testuser@gmail.com",
      firstName: "Lukas",
      lastName: "Roberts",
      address: "123 El Dorado",
      city: "Hills",
      state: "California",
      zip: 95762
    };

    const result = await apiUpdate(testuser, token);

    expect(bankingClient.patch).toHaveBeenCalledWith('/user/profile',
      testuser,
      {headers: { 'authorization': token},
      withCredentials: true
    })
    expect(result.status).toBe(200);

  })
})