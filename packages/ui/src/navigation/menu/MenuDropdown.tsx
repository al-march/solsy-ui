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
        const focusEl = document.activeElement;

        if (focusEl instanceof HTMLLIElement) {
          const next = isDown
            ? focusEl.nextElementSibling
            : focusEl.previousElementSibling;
          if (next instanceof HTMLLIElement) {
            next.focus();
            return;
          }
        }

        if (isDown) {
          const target = e.target;
          if (target instanceof HTMLElement) {
            const li = target.querySelector('li');
            if (li instanceof HTMLLIElement) {
              li.focus();
              return;
            }
          }
        }
        return;
    }
  }

  return (
    <Dropdown
      trigger={ctx.state.trigger}
      show={ctx.state.show}
      onBackdropClick={ctx.onBackdropClick}
      placement={pr.placement}
      offset={pr.offset}
      class={pr.class}
      minWidth={pr.minWidth}
      ref={el => {
        props.ref?.(el);
        ctx.initDropdown(el);
      }}
    >
      <div class="overflow-hidden" onKeyDown={onKeyDown}>
        <ul class="menu bg-base-200 z-10 shadow-xl">{props.children}</ul>
      </div>
    </Dropdown>
  );
};
