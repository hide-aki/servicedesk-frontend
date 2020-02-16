import React from 'react';
import ReactDOM from 'react-dom';

import TicketDashboard from './components/ticket/TicketDashboard';

import * as serviceWorker from './libs/serviceWorker';

import './index.css';
import 'typeface-roboto';

ReactDOM.render(<TicketDashboard />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
