import React from 'react';
import reactDom from 'react-dom';
import App from './src/App';
import Provider from './src/context/Provider';

reactDom.render(
	<Provider>
		<App />
	</Provider>
	, document.getElementById('root'));
