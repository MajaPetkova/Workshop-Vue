import axiosDJ from '../config/axiosInstance';

const ENDPOINT = 'auth';

export async function loginUser({ username, password }, expiresInMins = 30) {
  try {
    const res = await axiosDJ.post(`/${ENDPOINT}/login`, { username, password, expiresInMins });
    return res.data;
  }
  catch (err) {
    console.error('Oops something went wrong', err);
    return null;
  }
}
