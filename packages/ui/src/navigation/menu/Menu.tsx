import {PropClickEvent} from '../../types';
import {BackdropClick, ScaleTransition, usePopper} from '../../utils';
import {
  createEffect,
  createSignal,
  onCleanup,
  ParentProps,
  Show,
} from 'solid-js';
import {createStore} from 'solid-js/store';
import {Portal} from 'solid-js/web';

export const MenuSelectors = {
  MENU: 'menu',
  OPTION: 'option',
};

type MenuState = {
  show: boolean;
};

export type MenuProps = {
  isShow: boolean;
  reference?: HTMLElement;
  onBackdropClick?: () => void;
  minWidth?: number;
};

/**
 * Создает меню с оверлеем.
 * Внедряется в элемент, к которому примонтировано приложение;
 * Не управляет самостоятельно своим состоянием отображения.
 * Переключается с помощью props.show
 *
 * @example
 *
 * <Menu
 *    isShow={isShow}
 *    reference={ref}
 *    onBackdropClick={toggle}
 *    minWidth={ref?.scrollWidth}
 *  >
 *    <Menu.Item>Car</Menu.Item>
 *    <Menu.Item>Plane</Menu.Item>
 *    <Menu.Item>Bike</Menu.Item>
 *  </Menu>
 */
const MenuBase = (props: ParentProps<MenuProps>) => {
  const [state, setState] = createStore<MenuState>({
    show: props.isShow,
  });

  const [ref] = createSignal(props.reference);
  const [popper, setPopper] = createSignal<HTMLElement>();

  createEffect(() => {
    if (props.isShow) {
      setShow(true);
    }
  });

  onCleanup(() => {
    instance()?.destroy();
  });

  function setShow(state: boolean) {
    setState('show', state);
  }

  function destroy() {
    setShow(false);
  }

  const instance = usePopper(ref, popper, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  function onBackdropClick(e: Event) {
    const target = e.target as HTMLElement;
    if (ref()?.contains(target)) {
      return;
    }
    props.onBackdropClick?.();
  }

  return (
    <Show when={state.show} keyed>
      <Portal>
        <BackdropClick onBackdropClick={onBackdropClick}>
          <div
            data-testid={MenuSelectors.MENU}
            ref={setPopper}
            class="z-50"
            style={{'min-width': props.minWidth + 'px'}}
            onClick={e => e.stopPropagation()}
          >
            <ScaleTransition appear onExit={destroy}>
              {props.isShow && (
                <ul class="menu bg-base-200 z-10 shadow-xl">
                  {props.children}
                </ul>
              )}
            </ScaleTransition>
          </div>
        </BackdropClick>
      </Portal>
    </Show>
  );
};

type MenuOptionProps = {
  active?: boolean;
  disabled?: boolean;
  onClick?: (e: PropClickEvent<HTMLLIElement>) => void;
};

export const MenuOption = (props: ParentProps<MenuOptionProps>) => {
  return (
    <li
      data-testid={MenuSelectors.OPTION}
      onClick={props.onClick}
      classList={{
        disabled: !!props.disabled,
      }}
    >
      <a classList={{active: !!props.active}}>{props.children}</a>
    </li>
  );
};

export const Menu = Object.assign(MenuBase, {Item: MenuOption});
