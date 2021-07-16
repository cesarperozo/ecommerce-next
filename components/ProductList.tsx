import "tailwindcss/tailwind.css";
import 'react-toastify/dist/ReactToastify.css';
import { useProducts } from "../Context/ProductsContext";
import GetProducts from "../services/GetProducts";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { ToastContainer, toast } from 'react-toastify';


const ProductList = () => {
  const [products, setProductsList] = useState([]);
  const { addProduct }: any = useProducts();

  const handleAddProduct = (product) => {
    addProduct(product);
    toast(<h1 className="max-w-xs text-lg font-bold text-center text-gray-500 truncate title">Agregado al carrito 🛒</h1>), {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  };

  useEffect(() => {
    GetProducts().then((products) => setProductsList(products));
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
        <ToastContainer position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover />
      </div>
    </div>
  );
};
export default ProductList;
