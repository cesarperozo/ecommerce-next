import React from 'react'
import swal from 'sweetalert';
import "tailwindcss/tailwind.css";
import useProducts from "../Context/ProductsContext";
import { TrashIcon } from '@heroicons/react/outline'
import { CreditCardIcon } from '@heroicons/react/solid'

import Link from 'next/link';


const Cart = () => {

  const { products, deleteProduct, emptyCart }: any = useProducts();

  const handleDelete = (id: number) => {
    swal({
      title: "Estas seguro de eliminar este producto?",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    })
      .then((response) => {
        if (response) {
          deleteProduct(id)
          swal("!Producto eliminado con exito!", {
            icon: "success",
            buttons: [false],
            timer: 2000
          });
        } else {
          swal.close();
        }
      });
  }



  const handleFinalize = () => {
    swal({
      title: "Estas seguro que quiere comprar estos productos?",
      icon: "success",
      buttons: ["Cancelar", "Comprar"],
      dangerMode: false,
    })
      .then((response) => {
        if (response) {
          emptyCart();
          swal("!Compra realizada con exito!", {
            icon: "success",
            buttons: [false],
            timer: 2000
          });
        } else {
          swal.close();
        }
      });
  }

  const handleEmpty = () => {
    swal({
      title: "Estas seguro que vaciar el carrito?",
      icon: "warning",
      buttons: ["Cancelar", "Vaciar"],
      dangerMode: true,
    })
      .then((response) => {
        if (response) {
          emptyCart();
          swal("!Su carrito ahora se encuentra vacio!", {
            icon: "success",
            buttons: [false],
            timer: 2000
          });
        } else {
          swal.close();
        }
      });
  }

  return (
    <div className="container p-5 my-5 shadow-2xl">
      <div className="flex ">
        <div className="w-full p-4 m-2">
          <div>
            <h1 className="text-blue-500 uppercase">Carrito ({products.length})</h1>
          </div>
          <hr className="mt-2 mb-5" />
          {products.length ? <>
            <table className="w-full table-fixed Border-b">
              <thead className="divide-gray-300">
                <tr className="uppercase ">
                  <th className="w-1/12 "></th>
                  <th className="w-1/2 text-left">Producto</th>
                  <th className="w-1/6 ">Cantidad</th>
                  <th className="w-1/6 ">Precio unitario</th>
                  <th className="w-1/6 ">Total price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="p-8">
                    <td className="p-5">
                      <a href="#">
                        <img src={product.cover} className="w-20 rounded" alt="Thumbnail" />
                      </a>
                    </td>
                    <td className="border-b">
                      <p className="w-3/4 sm:truncate" title={product.name}>{product.name}</p>
                      <button onClick={() => handleDelete(product.id)} className="inline-flex items-center my-1 font-bold text-red-800 rounded">
                        <TrashIcon className="w-4 h-4 mr-2" />
                        <span>eliminar producto</span>
                      </button>
                    </td>
                    <td className="m-20 text-center border-b">
                      {product.qty}
                    </td>
                    <td className="text-center border-b">
                      {product.price}
                    </td>
                    <td className="text-center border-b">
                      {(Number(product.price) * product.qty).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-9">
              <button onClick={() => handleEmpty()} className="inline-flex items-center px-12 py-2 font-bold text-white bg-red-500 rounded ml-7 hover:bg-red-700">
                <TrashIcon className="w-5 h-5 mr-2" />
                <span>Vaciar carrito</span>
              </button>
              <button onClick={() => handleFinalize()} className="inline-flex items-center px-12 py-2 font-bold text-white bg-blue-500 rounded ml-7 hover:bg-blue-700">
                <CreditCardIcon className="w-5 h-5 mr-2 " />
                <span>Finalizar compra</span>
              </button>
            </div>
          </>
            : <div className="text-center text-gray-600">
              <p className="w-full mt-8 text-2xl">Tu carrito está vacío</p>
              <p>ir a la lista de <Link href={{ pathname: '/' }}><a className="font-bold text-blue-500 underline">PRODUCTOS</a></Link></p>
            </div>
          }
        </div>
      </div>

    </div >
  )
};

export default Cart;

