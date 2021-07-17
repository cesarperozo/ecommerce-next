import Header from "../components/Header"
import { ProductsProvider } from "../Context/ProductsContext"


function App({ Component, pageProps }) {

  return (
    <ProductsProvider>
      <>
        <Header />
        <Component {...pageProps} />
      </>
    </ProductsProvider>
  )

}

export default App
