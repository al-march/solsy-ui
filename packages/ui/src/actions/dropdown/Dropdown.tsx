import {BackdropClick, usePopper} from '../../utils';
import {DropdownAnimation} from './animation/DropdownAnimation';
import {Placement} from '@popperjs/core';
import {
  createEffect,
  createSignal,
  JSX,
  mergeProps,
  ParentProps,
  Show,
  splitProps,
} from 'solid-js';
import {Portal} from 'solid-js/web';

export const DropdownSelectors = {
  DROPDOWN: 'dropdown',
};

export type DropdownProps = {
  trigger?: HTMLElement;
  show?: boolean;
  minWidth?: number;
  onHideEnd?: () => void;
  onShowEnd?: () => void;
  onBackdropClick?: (e: Event) => void;
  placement?: Placement;
  offset?: [number, number];
  autofocus?: boolean;
} & JSX.HTMLAttributes<HTMLDivElement>;

type DropdownPropsDefault = Required<
  Pick<
    DropdownProps,
    | 'placement'
    | 'offset'
    | 'show'
    | 'class'
    | 'minWidth'
    | 'autofocus'
    | 'classList'
  >
>;

const defaultProps: DropdownPropsDefault = {
  placement: 'bottom',
  offset: [0, 8],
  show: false,
  class: '',
  minWidth: 0,
  autofocus: true,
  classList: {},
};

export const Dropdown = (props: ParentProps<DropdownProps>) => {
  const pr = mergeProps({...defaultProps}, props);
  const [local, others] = splitProps(pr, [
    'trigger',
    'show',
    'ref',
    'minWidth',
    'onHideEnd',
    'onShowEnd',
    'onBackdropClick',
    'placement',
    'offset',
    'autofocus',
    'class',
    'classList',
    'children',
  ]);

  const [show, setShow] = createSignal(pr.show);
  const [trigger, setTrigger] = createSignal(pr.trigger);
  const [dropdown, setDropdown] = createSignal<HTMLElement>();

  createEffect(() => {
    if (local.show) {
      setShow(true);
      if (local.autofocus) {
        focus();
      }
    }

    if (local.trigger !== trigger()) {
      setTrigger(local.trigger);
    }
  });

  /* Listen changes of placement */
  createEffect(prev => {
    if (local.placement !== prev) {
      createPopper();
    }
  }, local.placement);

  function createPopper() {
    usePopper(trigger, dropdown, {
      placement: local.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: local.offset,
          },
        },
      ],
    });
  }

  function open() {
    local.onShowEnd?.();
  }

  function close() {
    setShow(false);
    local.onHideEnd?.();
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
            if (typeof local.ref === 'function') {
              local.ref?.(el);
            }
            setDropdown(el);
            createPopper();
          }}
          tabIndex={0}
          style={{
            'min-width': local.minWidth ? local.minWidth + 'px' : undefined,
          }}
          class="z-50 overflow-hidden overflow-y-auto outline-none"
          classList={{
            [local.class]: !!local.class,
            ...local.classList,
          }}
          {...others}
        >
          <DropdownAnimation onEnter={open} onExit={close}>
            {local.show && (
              <BackdropClick onBackdropClick={local.onBackdropClick}>
                <div class="overflow-hidden">{local.children}</div>
              </BackdropClick>
            )}
          </DropdownAnimation>
        </div>
      </Portal>
    </Show>
  );
};
