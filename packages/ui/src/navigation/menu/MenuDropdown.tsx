import {Dropdown} from '../../actions';
import {useMenu} from './Menu';
import {Placement} from '@popperjs/core';
import {createEffect, mergeProps, ParentProps} from 'solid-js';

export type MenuDropdownProps = {
  show?: boolean;
  minWidth?: number;
  class?: string;
  ref?: (ref: HTMLElement) => void;

  placement?: Placement;
  offset?: [number, number];
};

type DefaultProps = Required<
  Pick<MenuDropdownProps, 'minWidth' | 'class' | 'placement' | 'offset'>
>;

const defaultProps: DefaultProps = {
  minWidth: 0,
  class: '',
  placement: 'bottom',
  offset: [0, 8],
};

export const MenuDropdown = (props: ParentProps<MenuDropdownProps>) => {
  const ctx = useMenu();
  const pr = mergeProps({...defaultProps}, props);

  createEffect(() => {
    if (ctx.state.show) {
      ctx.state.dropdown?.focus();
    }
  });

  function onKeyDown(e: KeyboardEvent) {
    switch (e.code) {
      case 'Escape':
        ctx.hide();
        return;
      case 'ArrowDown':
      case 'ArrowUp':
        e.preventDefault();

        const isDown = e.code === 'ArrowDown';

        if (isDown) {
          const target = e.target;
          if (target instanceof HTMLElement) {
            const button = target.querySelector('button');
            if (button instanceof HTMLButtonElement) {
              button.focus();
              return;
            }
          }
        }

        const focusEl = document.activeElement;
        if (focusEl instanceof HTMLButtonElement) {
          focusNextButton(focusEl, isDown ? 'next' : 'prev');
        }
    }
  }

  function focusNextButton(
    button: HTMLButtonElement,
    direction: 'next' | 'prev' = 'next'
  ) {
    const li = button.parentNode;
    if (li instanceof HTMLElement) {
      const next =
        direction === 'next'
          ? li.nextElementSibling
          : li.previousElementSibling;

      const button = next?.querySelector('button');
      if (button instanceof HTMLButtonElement) {
        if (button.disabled) {
          focusNextButton(button, direction);
          return;
        }
        button.focus();
      }
    }
  }

  return (
    <Dropdown
      trigger={ctx.state.trigger}
      show={ctx.state.show && !!ctx.state.trigger}
      onBackdropClick={ctx.onBackdropClick}
      placement={pr.placement}
      offset={pr.offset}
      class={pr.class}
      minWidth={pr.minWidth}
      ref={el => {
        props.ref?.(el);
        ctx.initDropdown(el);
      }}
      onKeyDown={onKeyDown}
    >
      <div class="overflow-hidden">
        <ul class="menu bg-base-200 z-10 shadow-xl">{props.children}</ul>
      </div>
    </Dropdown>
  );
};
