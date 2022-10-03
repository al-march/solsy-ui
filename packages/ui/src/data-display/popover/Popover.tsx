import {BackdropClick, SlideUpTransition, usePopper} from '../../utils';
import {Placement} from '@popperjs/core';
import {
  createContext,
  createEffect,
  createSignal,
  JSXElement,
  onCleanup,
  ParentProps,
  Show,
  useContext,
} from 'solid-js';
import {createStore} from 'solid-js/store';
import {Portal} from 'solid-js/web';

export const PopoverSelectors = {
  TRIGGER: 'popover-trigger',
  CONTENT: 'popover-content',
};

type PopoverState = {
  isOpen: boolean;
  isClose: boolean;
};

type PopoverContextType = {
  state: PopoverState;
  open: () => void;
  close: () => void;
};

export type PopoverProps = {
  trigger: JSXElement;
  placement?: Placement;
  show?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  openByTriggerClick?: boolean;
};

export const Popover = (props: ParentProps<PopoverProps>) => {
  const [ref, setRef] = createSignal<HTMLElement>();
  const [popper, setPopper] = createSignal<HTMLElement>();

  const [state, setState] = createStore<PopoverState>({
    isOpen: !!props.show,
    get isClose() {
      return !this._isOpen;
    },
  });

  const instance = usePopper(ref, popper, {
    placement: props.placement || 'auto',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  /*
   * Open/close Popover according props.show
   */
  createEffect(() => {
    const isOpen = props.show;
    if (typeof isOpen === 'boolean') {
      setState('isOpen', isOpen);
    }
  });

  onCleanup(() => {
    instance()?.destroy();
  });

  function open() {
    if (state.isClose) {
      setState('isOpen', true);
      props.onOpen?.();
    }
  }

  function close() {
    if (state.isOpen) {
      setState('isOpen', false);
      props.onClose?.();
    }
  }

  function onBackdropClick(e: Event) {
    const target = e.target as HTMLElement;
    if (ref()?.contains(target)) {
      return;
    }
    close();
  }

  return (
    <PopoverCtx.Provider
      value={{
        state,
        open,
        close,
      }}
    >
      <div
        data-testid={PopoverSelectors.TRIGGER}
        class="inline-block"
        ref={setRef}
        onClick={() => props.openByTriggerClick !== false && open()}
      >
        {props.trigger}
      </div>

      <PopoverContent ref={setPopper}>
        <BackdropClick onBackdropClick={onBackdropClick}>
          {props.children}
        </BackdropClick>
      </PopoverContent>
    </PopoverCtx.Provider>
  );
};

type PopoverContentProps = {
  ref: (el: HTMLElement) => void;
};

const PopoverContent = (props: ParentProps<PopoverContentProps>) => {
  const popover = usePopover();
  const [show, setShow] = createSignal(popover.state.isOpen);

  createEffect(() => {
    const isOpen = popover.state.isOpen;
    if (isOpen) {
      setShow(isOpen);
    }
  });

  return (
    <Show when={show()}>
      <Portal>
        <div
          data-testid={PopoverSelectors.CONTENT}
          class="z-50"
          ref={props.ref}
        >
          <SlideUpTransition appear onExitDone={() => setShow(false)}>
            {popover.state.isOpen && props.children}
          </SlideUpTransition>
        </div>
      </Portal>
    </Show>
  );
};

const PopoverCtx = createContext<PopoverContextType>();

const usePopover = () => {
  const ctx = useContext(PopoverCtx);
  if (ctx) {
    return ctx;
  }
  throw new Error('No context for Popover');
};
