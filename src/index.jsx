import './css/root.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from "./Home.jsx";

const rootElement = document.getElementById('root');
const render = createRoot(rootElement);
rootElement.ondrop = (event) => event.preventDefault();
rootElement.ondrag = (event) => event.preventDefault();

const App = () => {
    return (
        <Provider store={store}>
            <Home/>
        </Provider>
    );
}

render.render(<App />);