import {DropdownSelectors} from '../../actions';
import {isChildrenFunction} from '../../utils/solid';
import {MenuDropdown} from './MenuDropdown';
import {MenuOption} from './MenuItem';
import {MenuTrigger} from './MenuTrigger';
import {
  createContext,
  createEffect,
  JSXElement,
  mergeProps,
  Show,
  useContext,
} from 'solid-js';
import {createStore} from 'solid-js/store';

export const MenuSelectors = {
  MENU: 'menu',
  TRIGGER: 'trigger',
  DROPDOWN: DropdownSelectors.DROPDOWN,
  OPTION: 'option',
};

export type MenuState = {
  show: boolean;
  trigger?: HTMLElement;
  dropdown?: HTMLElement;
};

type BtnGroupCtx = {
  state: MenuState;
  show: () => void;
  hide: () => void;
  toggle: () => void;

  initTrigger: (el: HTMLElement) => void;
  initDropdown: (el: HTMLElement) => void;
  onBackdropClick: (e: Event) => void;
};

const MenuCtx = createContext<BtnGroupCtx>();

type MenuChildrenWithState = (state: MenuState) => JSXElement;

export type MenuProps = {
  show?: boolean;
  class?: string;

  onInput?: (state: boolean) => void;
  onShow?: () => void;
  onHide?: () => void;
  onBackdropClick?: (e: Event) => void;

  children?: JSXElement | MenuChildrenWithState;
};

type MenuDefaultProps = Required<Pick<MenuProps, 'show' | 'class'>>;

const defaultProps: MenuDefaultProps = {
  show: false,
  class: '',
};

const MenuBase = (props: MenuProps) => {
  const pr = mergeProps({...defaultProps}, props);

  const [state, setState] = createStore<MenuState>({
    show: pr.show,
  });

  createEffect(() => {
    if (props.show) {
      show(false);
    }
  });

  function show(emit = true) {
    setState('show', true);
    if (emit) {
      props.onShow?.();
      props.onInput?.(true);
    }
  }

  function hide() {
    setState('show', false);
    props.onHide?.();
    props.onInput?.(false);
  }

  function toggle() {
    if (state.show) {
      hide();
    } else {
      show();
    }
  }

  function initTrigger(el: HTMLElement) {
    setState('trigger', el);
  }

  function initDropdown(el: HTMLElement) {
    setState('dropdown', el);
  }

  function onBackdropClick(e: Event) {
    const target = e.target as HTMLElement;
    if (state.dropdown?.contains(target)) {
      return;
    }
    hide();
    pr.onBackdropClick?.(e);
  }

  return (
    <MenuCtx.Provider
      value={{
        state,
        show,
        hide,
        toggle,
        initTrigger,
        initDropdown,
        onBackdropClick,
      }}
    >
      <div
        data-testid={MenuSelectors.MENU}
        class="inline-flex"
        classList={{[pr.class]: !!pr.class}}
      >
        <Show
          when={isChildrenFunction(props)}
          fallback={props.children as JSXElement}
          keyed
        >
          {(props.children as MenuChildrenWithState)?.(state)}
        </Show>
      </div>
    </MenuCtx.Provider>
  );
};

export const Menu = Object.assign(MenuBase, {
  Item: MenuOption,
  Dropdown: MenuDropdown,
  Trigger: MenuTrigger,
});

export const useMenu = () => {
  const ctx = useContext(MenuCtx);
  if (ctx) {
    return ctx;
  }
  throw new Error('No context for Menu');
};
