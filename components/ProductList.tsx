import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useProducts } from '../context/ProductsContext';
import getProducts from '../services/productService';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addProduct }: any = useProducts();

  const handleAddProduct = (product) => {
    addProduct(product);
    toast(
      <p className="max-w-xs text-lg font-bold text-center text-gray-500 truncate title">
        Agregado al carrito 🛒
      </p>
    );
  };

  useEffect(() => {
    getProducts().then((products) => setProducts(products));
  }, []);

  return (
    <div className="container py-10">
      <div className="mb-10 text-4xl font-bold text-center text-gray-600">
        <span>Lista de productos</span>
      </div>
      <div className="grid grid-cols-1 gap-4 rounded sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard product={product} handleAddProduct={handleAddProduct} />
        ))}
      </div>
    </div>
  );
};
export default ProductList;
