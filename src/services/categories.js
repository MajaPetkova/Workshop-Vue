import axiosDJ from '../config/axiosInstance';

const ENDPOINT = 'products/categories';

export async function getAllCategories() {
  try {
    const response = await axiosDJ.get(`/${ENDPOINT}`);
    return response.data;
  }
  catch (err) {
    console.error('Ooops unexpected', err);
    return [];
  }
}
