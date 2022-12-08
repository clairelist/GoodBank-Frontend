import axios from 'axios';

// This is the configuration for sending HTTP Requests with Axios
// Very simple, but it also doesn't give us much abstraction
const bankingClient = axios.create({
  withCredentials: true,
  // switch these in your .env file
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  },
  validateStatus: () => true
});

bankingClient.interceptors.request.use(
  (request) => {
      if (request.headers) {
          request.headers['Authorization'] = `${sessionStorage.getItem('token')}`;
      }
      return request;
  }
);

export interface bankingApiResponse {
  status: number;
  headers: any;
  payload: any;
}

export default bankingClient;