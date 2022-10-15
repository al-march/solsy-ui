import {ScaleTransition} from '../../utils';
import {
  createEffect,
  createSignal,
  mergeProps,
  on,
  onCleanup,
  onMount,
  ParentProps,
  Show,
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

  onBackdropClick?: () => void;

  onOpen?: () => void;
  onClose?: () => void;
};

export type ModalState = {
  show: boolean;
  trigger?: HTMLElement;
};

type ModalDefaultProps = Required<Pick<ModalProps, 'show' | 'class'>>;

const modalDefaultProps: ModalDefaultProps = {
  show: false,
  class: '',
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

  const [state, setState] = createStore<ModalState>({
    show: pr.show,
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
    props.onBackdropClick?.();
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
          onClick={backdropClickHandler}
        >
          <ScaleTransition appear onExit={close}>
            <Show when={pr.show} keyed>
              <div
                data-testid={ModalSelectors.MODAL}
                tabIndex="0"
                ref={ref => {
                  setModalRef(ref);
                  focusOn(ref);
                }}
                class="modal-box transition-none transform-none opacity-100 outline-none"
                classList={{[pr.class]: !!pr.class}}
                onClick={e => e.stopPropagation()}
              >
                {props.children}
              </div>
            </Show>
          </ScaleTransition>
        </div>
      </Portal>
    </Show>
  );
};
