import {BackdropClick, usePopper} from '../../utils';
import {DropdownAnimation} from './animation/DropdownAnimation';
import {Placement} from '@popperjs/core';
import {
  createEffect,
  createSignal,
  mergeProps,
  onCleanup,
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

  placement?: Placement;
  offset?: [number, number];
};

type DropdownPropsDefault = Required<
  Pick<DropdownProps, 'placement' | 'offset' | 'show' | 'class' | 'minWidth'>
>;

const defaultProps: DropdownPropsDefault = {
  placement: 'bottom',
  offset: [0, 8],
  show: false,
  class: '',
  minWidth: 0,
};

export const Dropdown = (props: ParentProps<DropdownProps>) => {
  const pr = mergeProps({...defaultProps}, props);
  const [show, setShow] = createSignal(pr.show);
  const [trigger, setTrigger] = createSignal(pr.trigger);
  const [dropdown, setDropdown] = createSignal<HTMLElement>();

  createEffect(() => {
    if (pr.show) {
      setShow(true);
      focus();
    }

    if (pr.trigger !== trigger()) {
      setTrigger(pr.trigger);
    }
  });

  onCleanup(() => {
    instance()?.destroy();
  });

  const instance = usePopper(trigger, dropdown, {
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
          }}
          tabIndex={0}
          class="z-50 overflow-hidden overflow-y-scroll outline-none"
          classList={{[pr.class]: !!props.class}}
          style={{'min-width': pr.minWidth ? pr.minWidth + 'px' : undefined}}
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
