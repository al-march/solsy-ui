import { createEffect, createSignal, ParentProps, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { ScaleTransition } from '../../utils';

export const ModalSelectors = {
  MODAL: 'modal',
  BACKDROP: 'modal-backdrop'
};

export type ModalProps = {
  isShow?: boolean;
  class?: string;

  onBackdropClick?: () => void;
  onClose?: () => void;
}

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

  createEffect(() => {
    if (props.isShow) {
      setShow(true);
    }
  });

  const close = () => {
    setShow(false);
    props.onClose?.();
  };

  const backdropClickHandler = () => {
    props.onBackdropClick?.();
  };

  return (
    <Show when={show()}>
      <Portal>
        <div
          data-testid={ModalSelectors.BACKDROP}
          class="modal opacity-100 visible z-50 pointer-events-auto"
          onClick={backdropClickHandler}
        >
          <ScaleTransition appear onExit={close}>
            <Show when={props.isShow}>
              <div
                data-testid={ModalSelectors.MODAL}
                class={`modal-box transition-none transform-none opacity-100 ${props.class || ''}`}
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
