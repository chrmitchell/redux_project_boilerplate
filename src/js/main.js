import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';

import appReducer from './reducers/appReducer';
import App from './components/App.jsx';

const logger = createLogger({ timestamp: false, collapsed: true });

const render = () => {
	ReactDOM.render((
		<Provider store={store}>
			<App />
		</Provider>
	), document.getElementById('content'));
};

const outputHTML = () => {
	console.log( ReactDOMServer.renderToString(
		<Provider store={store}>
			<App />
		</Provider>
	) );
};

var store = createStore(appReducer, applyMiddleware(thunk, logger));
store.subscribe(render);

render();
// outputHTML();