/* @refresh reload */
import App from './App';
import './index.css';
import {Router, hashIntegration} from '@solidjs/router';
import 'prism-themes/themes/prism-night-owl.min.css';
import {render} from 'solid-js/web';

render(
  () => (
    <Router source={hashIntegration()}>
      <App />
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);
