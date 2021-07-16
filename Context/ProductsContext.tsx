import React, { useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Product } from "../models";

const ProductsContext = React.createContext({
  products: [],
});

interface ProductsContextProps {
  children: JSX.Element;
}

export function ProductsProvider({ children }: ProductsContextProps) {
  const [products, setProducts] = useLocalStorage('products', []);


  const addProduct = (newProduct: Product) => {
    let product = products.find((product) => product.id === newProduct.id);
    let productsToAdd = []
    if (product) {
      product.qty = product.qty + 1;
      productsToAdd = [...products];
    } else {
      product = {
        ...newProduct,
        qty: 1,
      };
      productsToAdd = [...products, product]
    }

    setProducts(productsToAdd);
  };

  const deleteProduct = (id: number) => {
    const productDelete = products.filter((product) => product.id !== id)
    setProducts(productDelete)
  }

  const emptyCart = () => {
    setProducts([])
  }

  const value = useMemo(() => ({
    addProduct,
    products,
    deleteProduct,
    emptyCart,
  }),
    [products]
  );

  const totalCartPrice = () => {

  }


  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = React.useContext(ProductsContext);
  if (!context) {
    throw new Error(
      "useProducts debe estar dentro del proveedor UsuarioContext"
    );
  }
  return context;
}

export default useProducts;
