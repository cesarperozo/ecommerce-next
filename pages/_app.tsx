import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import Header from '../components/Header';
import { ProductsProvider } from '../context/ProductsContext';

function App({ Component, pageProps }) {
  return (
    <ProductsProvider>
      <>
        <Head>
          <title>Meru</title>
        </Head>
        <Header />
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    </ProductsProvider>
  );
}

export default App;
