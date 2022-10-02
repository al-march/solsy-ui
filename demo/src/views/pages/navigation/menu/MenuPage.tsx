import {Page} from '@page/base';
import {Menu} from '@ui/navigation';
import {Component} from 'solid-js';
import {createStore} from 'solid-js/store';

type State = {
  show: boolean;
  reference?: HTMLElement;
};

export const MenuPage: Component = () => {
  const [state, setState] = createStore<State>({
    show: true,
  });

  function setReference(reference: HTMLElement) {
    setState('reference', reference);
  }

  function toggle() {
    setState('show', !state.show);
  }

  return (
    <Page full class="p-4">
      <button class="btn btn-primary" ref={setReference} onClick={toggle}>
        Menu
      </button>
      <Menu
        isShow={state.show}
        reference={state.reference}
        onBackdropClick={toggle}
        minWidth={state.reference?.scrollWidth}
      >
        <Menu.Item>
          <i class="fa-solid fa-car pr-2" />
          Cars
        </Menu.Item>
        <Menu.Item disabled>
          <i class="fa-solid fa-plane-departure pr-2" />
          Plane
        </Menu.Item>
        <Menu.Item>
          <i class="fa-solid fa-building pr-2" />
          Buildings
        </Menu.Item>
      </Menu>
    </Page>
  );
};
