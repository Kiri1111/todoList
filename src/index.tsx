import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './app/App';
import {store} from './app/store';
import {Provider} from 'react-redux';
import {ker9Age} from "./file";

const rerenderEntireTree = () => {

    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>, document.getElementById('root'));

}

rerenderEntireTree()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

console.log(ker9Age)

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./app/App', () => {
        rerenderEntireTree()
    })
    module.hot.accept('./app/store', () => {
        rerenderEntireTree()
    })
}