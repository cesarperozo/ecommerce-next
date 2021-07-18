const url = 'https://products-api-meru.vercel.app/api/products';

const getProducts = () => {
  return fetch(url).then((resp) => resp.json());
};

export default getProducts;
