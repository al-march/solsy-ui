import { Component, createEffect, createSignal, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { ScaleTransition } from '../../utils';

type Props = {
    isShow?: boolean;
    onBackdropClick?: () => void;
    onClose?: () => void;
    class?: string;
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
export const Modal: Component<Props> = (props) => {

    const [show, setShow] = createSignal(false);

    createEffect(() => {
        if (props.isShow) {
            setShow(true);
        }
    });

    function close() {
        setShow(false);
        props.onClose && props.onClose();
    }

    function backdropClickHandler() {
        if (props.onBackdropClick) {
            props.onBackdropClick();
        }
    }

    return (
        <Show when={show()}>
            <Portal>
                <div class="modal opacity-100 visible z-50 pointer-events-auto" onClick={backdropClickHandler}>
                    <ScaleTransition appear={true} onExit={close}>
                        <Show when={props.isShow}>
                            <div
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
