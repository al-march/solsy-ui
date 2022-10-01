import {Drawer, Header} from './views/template';
import {Routers} from '@shared/router/Routers';
import type {Component} from 'solid-js';

const App: Component = () => {
  return (
    <Drawer>
      <Header />
      <Routers />
    </Drawer>
  );
};

export default App;
