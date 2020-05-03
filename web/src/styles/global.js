import { createGlobalStyle } from 'styled-components';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    body {
        background: #312E38;
        color: #FFF;
        -webkit-font-smoothing: antialiased;
    }

    body, input , button {
        font-family: 'Roboto Slab', serif;
        font-size: 16px;
    }

    h1,h2, h3, h3, h5, h6, strong {
        font-weight: 500;
    }

    button: {
        cursor: pointer;
    }
`;
