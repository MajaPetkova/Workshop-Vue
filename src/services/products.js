import axiosDJ from '../config/axiosInstance';

const ENDPOINT = 'products';

export async function getAllProducts() {
  try {
    const res = await axiosDJ.get(`/${ENDPOINT}`);
    console.log(res);
    return res.data;
  }
  catch (err) {
    console.err('Ooops unexpected', err);
    return [];
  }
}
