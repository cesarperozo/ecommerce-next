import "tailwindcss/tailwind.css";
import React from "react";
import { PlusCircleIcon } from '@heroicons/react/solid'

import { Product } from "../models";

interface ProductCardProps {
  product: Product,
  handleAddProduct: any
}

const ProductCard = ({ product, handleAddProduct }: ProductCardProps) => {
  return (
    <div className="container static bg-white rounded shadow-2xl">
      <div className="relative overflow-hidden max-h-60 reunded-t">
        <img className="w-full" src={product.cover} alt={product.name} />
        <span className="absolute items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full badge top-3 left-3" >NEW</span>
      </div>
      <div className="px-4 py-4">
        <h2 className="max-w-xs text-lg text-gray-700 truncate title">{product.name}</h2>
      </div>
      <div className="container flex items-center px-4 pb-4 ">
        <div>
          <h5 className="text-xl font-bold">$ {product.price}</h5>
        </div>
        <div className="mt-1.5 ml-2">
          <button
            title="Agregar al Carrito"
            className="transform hover:scale-110 motion-reduce:transform-none"
            onClick={() => handleAddProduct(product)}
          >
            <PlusCircleIcon className="w-6 h-6 text-blue-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
