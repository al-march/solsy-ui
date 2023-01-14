import {BackdropClick, usePopper} from '../../utils';
import {DropdownAnimation} from './animation/DropdownAnimation';
import {Placement} from '@popperjs/core';
import {
  createEffect,
  createSignal,
  mergeProps,
  ParentProps,
  Show,
} from 'solid-js';
import {Portal} from 'solid-js/web';

export const DropdownSelectors = {
  DROPDOWN: 'dropdown',
};

export type DropdownProps = {
  trigger?: HTMLElement;
  show?: boolean;
  ref?: (el: HTMLElement) => void;
  class?: string;

  minWidth?: number;
  onHideEnd?: () => void;
  onShowEnd?: () => void;
  onBackdropClick?: (e: Event) => void;
  onKeyDown?: (e: KeyboardEvent) => void;

  placement?: Placement;
  offset?: [number, number];
  autofocus?: boolean;
};

type DropdownPropsDefault = Required<
  Pick<
    DropdownProps,
    'placement' | 'offset' | 'show' | 'class' | 'minWidth' | 'autofocus'
  >
>;

const defaultProps: DropdownPropsDefault = {
  placement: 'bottom',
  offset: [0, 8],
  show: false,
  class: '',
  minWidth: 0,
  autofocus: true,
};

export const Dropdown = (props: ParentProps<DropdownProps>) => {
  const pr = mergeProps({...defaultProps}, props);
  const [show, setShow] = createSignal(pr.show);
  const [trigger, setTrigger] = createSignal(pr.trigger);
  const [dropdown, setDropdown] = createSignal<HTMLElement>();

  createEffect(() => {
    if (pr.show) {
      setShow(true);
      if (pr.autofocus) {
        focus();
      }
    }

    if (pr.trigger !== trigger()) {
      setTrigger(pr.trigger);
    }
  });

  /* Listen changes of placement */
  createEffect(prev => {
    if (pr.placement !== prev) {
      createPopper();
    }
  }, pr.placement);

  function createPopper() {
    usePopper(trigger, dropdown, {
      placement: pr.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: pr.offset,
          },
        },
      ],
    });
  }

  function open() {
    pr.onShowEnd?.();
  }

  function close() {
    setShow(false);
    pr.onHideEnd?.();
  }

  function focus() {
    dropdown()?.focus();
  }

  return (
    <Show when={show()} keyed>
      <Portal>
        <div
          data-testid={DropdownSelectors.DROPDOWN}
          ref={el => {
            pr.ref?.(el);
            setDropdown(el);
            createPopper();
          }}
          tabIndex={0}
          class="z-50 overflow-hidden overflow-y-auto outline-none"
          classList={{[pr.class]: !!props.class}}
          style={{'min-width': pr.minWidth ? pr.minWidth + 'px' : undefined}}
          onKeyDown={props.onKeyDown}
        >
          <DropdownAnimation onEnter={open} onExit={close}>
            {pr.show && (
              <BackdropClick onBackdropClick={pr.onBackdropClick}>
                <div class="overflow-hidden">{props.children}</div>
              </BackdropClick>
            )}
          </DropdownAnimation>
        </div>
      </Portal>
    </Show>
  );
};
