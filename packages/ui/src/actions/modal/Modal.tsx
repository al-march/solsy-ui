import {ScaleTransition} from '../../utils';
import {
  createEffect,
  createSignal,
  JSX,
  mergeProps,
  on,
  onCleanup,
  onMount,
  ParentProps,
  Show,
  splitProps,
} from 'solid-js';
import {createStore} from 'solid-js/store';
import {Portal} from 'solid-js/web';

export const ModalSelectors = {
  MODAL: 'modal',
  BACKDROP: 'modal-backdrop',
};

export type ModalProps = {
  show?: boolean;
  class?: string;
  trigger?: HTMLButtonElement;
  responsive?: boolean;
  onBackdropClick?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
} & JSX.HTMLAttributes<HTMLDivElement>;

export type ModalState = {
  show: boolean;
  trigger?: HTMLElement;
};

type ModalDefaultProps = Required<
  Pick<ModalProps, 'show' | 'class' | 'tabIndex' | 'classList'>
>;

const modalDefaultProps: ModalDefaultProps = {
  show: false,
  class: '',
  tabIndex: '0',
  classList: {},
};

/**
 * Компонент модального окна
 *
 * @example
 * <Modal isShow={modalShow()} onBackdropClick={toggleModal}>
 *     <h3 class="font-bold text-lg">Modal title</h3>
 *     <p class="py-4">Modal description</p>
 *     <ModalAction>
 *         <button class="btn" onClick={toggleModal}>Yay!</button>
 *     </ModalAction>
 * </Modal>
 */
export const Modal = (props: ParentProps<ModalProps>) => {
  const pr = mergeProps({...modalDefaultProps}, props);
  const [local, others] = splitProps(pr, [
    'show',
    'trigger',
    'responsive',
    'onBackdropClick',
    'onOpen',
    'onClose',
    'onClick',
    'class',
    'classList',
    'children',
    'tabIndex',
    'ref',
    'style',
  ]);

  const [state, setState] = createStore<ModalState>({
    show: local.show,
  });

  const [modalRef, setModalRef] = createSignal<HTMLElement>();

  createEffect(() => {
    if (props.show) {
      open();
    }
  });

  createEffect(
    on(modalRef, ref => {
      if (ref) {
        focusOn(ref);
      }
    })
  );

  function open() {
    updateTrigger();
    setState('show', true);
    props.onOpen?.();
  }

  function close() {
    focusTrigger();
    setState('show', false);
    props.onClose?.();
  }

  function updateTrigger() {
    const trigger = document.activeElement;
    if (trigger instanceof HTMLElement) {
      setState('trigger', trigger);
    } else {
      setState('trigger', undefined);
    }
  }

  function focusTrigger() {
    focusOn(state.trigger);
  }

  function keyboardPressHandler(evt: KeyboardEvent) {
    if (state.show && evt.key === 'Escape') {
      backdropClickHandler();
    }
  }

  function backdropClickHandler() {
    local.onBackdropClick?.();
  }

  function focusOn(el?: HTMLElement) {
    setTimeout(() => {
      el?.focus();
    });
  }

  onMount(() => {
    document.addEventListener('keydown', keyboardPressHandler);

    if (state.show) {
      const ref = modalRef();
      ref && focusOn(ref);
    }
  });

  onCleanup(() => {
    document.removeEventListener('keydown', keyboardPressHandler);
  });

  return (
    <Show when={state.show} keyed>
      <Portal>
        <div
          data-testid={ModalSelectors.BACKDROP}
          class="modal opacity-100 visible z-50 pointer-events-auto"
          classList={{
            'modal-bottom sm:modal-middle': !!local.responsive,
          }}
          onClick={backdropClickHandler}
        >
          <ScaleTransition appear onExit={close}>
            <Show when={local.show} keyed>
              <div
                data-testid={ModalSelectors.MODAL}
                tabIndex={local.tabIndex}
                ref={ref => {
                  setModalRef(ref);
                  focusOn(ref);
                  if (typeof local.ref === 'function') {
                    local.ref(ref);
                  }
                }}
                style={`transform: scale(1);  ${local.style}`}
                class="modal-box transition-none transform-none outline-none opacity-100"
                classList={{
                  [local.class]: !!local.class,
                  ...local.classList,
                }}
                onClick={e => {
                  e.stopPropagation();
                  if (typeof local.onClick === 'function') {
                    local.onClick(e);
                  }
                }}
                {...others}
              >
                {local.children}
              </div>
            </Show>
          </ScaleTransition>
        </div>
      </Portal>
    </Show>
  );
};
