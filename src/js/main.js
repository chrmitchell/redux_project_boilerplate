import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import appReducer from './reducers/appReducer';
import App from './components/App.jsx';

const render = () => {
	ReactDOM.render((
		<Provider store={store}>
			<App />
		</Provider>
	), document.getElementById('content'));
};

const logState = () => {
	console.log( store.getState() );
};

const outputHTML = () => {
	console.log( ReactDOMServer.renderToString(
		<Provider store={store}>
			<App />
		</Provider>
	) );
};

var store = createStore(appReducer, applyMiddleware(thunk));

store.subscribe(render);
store.subscribe(logState);

render();
logState();
// outputHTML();