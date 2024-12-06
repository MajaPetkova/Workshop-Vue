import axiosDJ from '../config/axiosInstance';

const ENDPOINT = 'products';

export async function getAllProducts() {
  try {
    const response = await axiosDJ.get(`/${ENDPOINT}`);
    return response.data.products;
  }
  catch (err) {
    console.error('Ooops unexpected', err);
    return [];
  }
}

export async function getProducts(slug) {
  try {
    const response = await axiosDJ.get(`/${ENDPOINT}/category/${slug}`);
    return response.data.products;
  }
  catch (err) {
    console.error('Ooops unexpected', err);
    return [];
  }
}
