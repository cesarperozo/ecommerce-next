import { ProductsProvider } from "../Context/ProductsContext"


function App({ Component, pageProps }) {

  return (
    <ProductsProvider>
      <Component {...pageProps} />
    </ProductsProvider>
  )

}

export default App
