import React from 'react';
import {Provider} from 'react-redux';
import {wrapper} from '../store/store';
import {CssBaseline} from '@mui/material';
import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ToastContainer } from 'react-toastify';


const MyApp = ({Component, ...rest}) => {
    const {store, props} = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <CssBaseline />
            <Component {...props.pageProps} />
            <ToastContainer position="bottom-right" autoClose={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss={false} draggable={false} theme="dark" />
        </Provider>
    );
};

export default MyApp;
