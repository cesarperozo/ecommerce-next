const apiKey = "https://products-api-meru.vercel.app/api/products";

const getProduct = () => {
  return fetch(apiKey)
    .then((resp) => resp.json())
    .then((response) => {
      const data = response;
      const products = data;

      return products;
    });
};

export default getProduct;
