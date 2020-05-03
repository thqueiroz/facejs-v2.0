import React from 'react';
import { ToastContainer } from 'react-toastify';
import SignIn from './pages/SignIn/SignIn';
import GlobalStyle from './styles/global';

function App() {
    return (
        <>
            <SignIn />
            <GlobalStyle />
            <ToastContainer />
        </>
    );
}

export default App;
