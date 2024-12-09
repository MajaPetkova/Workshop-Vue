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

export async function getProductsByIds(ids) {
  if (!Array.isArray(ids))
    return;
  try {
    const promises = ids.map(id => axiosDJ.get(`/${ENDPOINT}/${id}`));
    const response = await Promise.allSettled(promises);
    return response.filter(entry => entry.status === 'fulfilled').map(entry => entry.value.data);
  }
  catch (err) {
    console.error('Ooops unexpected', err);
    return [];
  }
}
