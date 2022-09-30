import {ScaleTransition} from '../../utils';
import {
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  ParentProps,
  Show,
} from 'solid-js';
import {Portal} from 'solid-js/web';

export const ModalSelectors = {
  MODAL: 'modal',
  BACKDROP: 'modal-backdrop',
};

export type ModalProps = {
  isShow?: boolean;
  class?: string;
  trigger?: HTMLButtonElement;

  onBackdropClick?: () => void;
  onClose?: () => void;
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
  const [show, setShow] = createSignal(false);
  let modalRef: HTMLDivElement | undefined;

  createEffect(() => {
    if (props.isShow) {
      setShow(true);
    }
    if (modalRef) {
      focusOn(modalRef);
    }
  });

  const close = () => {
    setShow(false);
    props.onClose?.();
    props.trigger && focusOn(props.trigger);
  };

  const keyboardPressHandler = (evt: KeyboardEvent) => {
    if (show() && evt.key === 'Escape') {
      backdropClickHandler();
    }
  };

  const backdropClickHandler = () => {
    props.onBackdropClick?.();
  };

  const focusOn = (el: HTMLElement) => {
    setTimeout(() => {
      el?.focus();
    });
  };

  onMount(() => {
    document.addEventListener('keydown', keyboardPressHandler);

    if (show()) {
      modalRef && focusOn(modalRef);
    }
  });

  onCleanup(() => {
    document.removeEventListener('keydown', keyboardPressHandler);
  });

  return (
    <Show when={show()} keyed>
      <Portal>
        <div
          data-testid={ModalSelectors.BACKDROP}
          class="modal opacity-100 visible z-50 pointer-events-auto"
          onClick={backdropClickHandler}
        >
          <ScaleTransition appear onExit={close}>
            <Show when={props.isShow} keyed>
              <div
                data-testid={ModalSelectors.MODAL}
                tabIndex="0"
                ref={ref => {
                  modalRef = ref;
                  focusOn(ref);
                }}
                class={`modal-box transition-none transform-none opacity-100 ${
                  props.class || ''
                }`}
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
