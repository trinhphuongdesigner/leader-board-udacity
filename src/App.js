import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider } from '@chakra-ui/react';

import AppRoutes from './routes';
import store from './store';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <ToastContainer autoClose={500} />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
