import axios from 'axios';

const LibraryAPI = axios.create({
  baseURL: '/api'
});

const login = async ({
  email,
  password
}: HandleLoginSubmitProps): Promise<AdminResponse> => {
  return LibraryAPI.post<AdminResponse>('/auth/login', {
    email,
    password
  })
    .then(resp => {
      return resp.data;
    })
    .catch((err: Error) => {
      return {
        message: 'Invalid Credentials',
        statusCode: 401,
        name: err.name
      };
    });
};

export default { login };
