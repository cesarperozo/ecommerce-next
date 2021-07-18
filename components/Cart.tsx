import React from 'react'
import swal from 'sweetalert';
import "tailwindcss/tailwind.css";
import useProducts from "../Context/ProductsContext";
import { TrashIcon } from '@heroicons/react/outline'
import { CreditCardIcon } from '@heroicons/react/solid'

import Link from 'next/link';
import { Product } from '../models';


const Cart = () => {

  const { products, deleteProduct, emptyCart, updateQty }: any = useProducts();

  const total = products.reduce((previousValue, product: Product) => {
    const subTotal: number = product.qty * parseFloat(product.price)
    return previousValue + subTotal
  }, 0).toFixed(2)

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

  const onChangeValue = (e, id) => {
    const qty = e.target.value
    if (qty < 1) {
      swal({
        title: "Estas seguro de eliminar este producto?",
        icon: "warning",
        buttons: ["Cancelar", "Eliminar"],
        dangerMode: true,
      })
        .then((response) => {
          if (response) {
            deleteProduct(id)
            swal("Producto eliminado con exito.", {
              icon: "success",
              buttons: [false],
              timer: 2000
            });
          } else {
            swal.close();
          }
        });
    } else {
      updateQty(id, qty)
    }
  }

  return (
    <div className="container p-5 shadow-2xl sm:my-5">
      <div className="flex flex-col ">
        <div className="w-full sm:p-4 sm:m-2">
          <h1 className="text-3xl text-blue-500 uppercase">Carrito ({products.length})</h1>
          <hr className="mt-2 mb-5" />
          {products.length ? <>
            <table className="w-full table-fixed Border-b">
              <thead className="divide-gray-300">
                <tr className="uppercase ">
                  <th className="hidden text-center sm:w-1/12 sm:inline"></th>
                  <th className="w-1/2 text-sm text-left sm:text-base ">Producto</th>
                  <th className="text-sm text-left sm:text-base">Cantidad</th>
                  <th className="invisible text-sm text-left sm:text-base sm:visible" >Precio</th>
                  <th className="text-sm text-left sm:text-base">Total</th>
                  <th className="text-sm text-left sm:text-base"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="hidden p-5 sm:inline">
                      <a href="#">
                        <img src={product.cover} className="w-20 rounded" alt="Thumbnail" />
                      </a>
                    </td>
                    <td className="text-sm text-left sm:border-b sm:text-base">
                      <p className="w-3/4 sm:truncate " title={product.name}>{product.name}</p>

                    </td>
                    <td className="m-20 text-sm text-left sm:border-b sm:text-base">
                      <input onChange={(e) => onChangeValue(e, product.id)} type="number" defaultValue={product.qty} min="0"
                        className="w-20 py-1 font-semibold text-center text-gray-700 bg-white border border-gray-300 rounded outline-none focus:outline-none hover:text-black focus:text-black" />
                    </td>
                    <td className="invisible text-sm text-left sm:border-b sm:text-base sm:visible">
                      $ {product.price}
                    </td>
                    <td className="text-sm text-left sm:border-b sm:text-base" >
                      $ {(Number(product.price) * product.qty).toFixed(2)}
                    </td>
                    <td className="text-sm text-left sm:border-b sm:text-base" >
                      <button onClick={() => handleDelete(product.id)} className="inline-flex items-center my-1 font-bold text-red-500 rounded">
                        <TrashIcon className="hidden mr-2 w-7 h-7 sm:inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end">
              <div className="flex justify-around w-full lg:w-1/3">
                <p className="pt-5 pr-12 font-bold text-right uppercase sm:text-base">Precio total</p>
                <p className="relative px-8 pt-6 pr-16 text-base uppercase">$ {total}</p>
              </div>
            </div>

          </>
            : <div className="text-center text-gray-600">
              <p className="w-full mt-8 text-2xl">Tu carrito está vacío</p>
              <p>ir a la lista de <Link href={{ pathname: '/' }}><a className="font-bold text-blue-500 underline">PRODUCTOS</a></Link></p>
            </div>
          }
        </div>

        {products.length !== 0 && (
          <div className="flex flex-col justify-end mt-4 sm:flex-row">
            <button disabled={!products.length} onClick={() => handleEmpty()} className="inline-flex items-center justify-center px-12 py-2 font-bold text-white bg-red-500 rounded sm:ml-7 hover:bg-red-700">
              <TrashIcon className="w-5 h-5 mr-2" />
              <span>Vaciar carrito</span>
            </button>
            <button disabled={!products.length} onClick={() => handleFinalize()} className="inline-flex items-center justify-center px-12 py-2 mt-5 font-bold text-white bg-blue-500 rounded sm:m-0 sm:ml-7 hover:bg-blue-700 sm:m0">
              <CreditCardIcon className="w-5 h-5 mr-2 " />
              <span>Finalizar compra</span>
            </button>
          </div>
        )}
      </div>
    </div >
  )
};
export default Cart;







