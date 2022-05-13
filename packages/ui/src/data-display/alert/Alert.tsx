import { Component, createEffect, createSignal, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { SlideUpTransition } from '../../utils';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

type Props = {
    show: boolean;
    type?: AlertType,
    onClose?: () => void;
    timeout?: number;
}

/**
 * Alert - компонент, для отображение уведомлений
 *
 * @example
 * <Alert
 *     show={alertShow()}
 *     type={alertType()}
 * >
 *     <div>We use cookies for no reason!</div>
 *     <div class="flex-none">
 *         <button class="btn btn-sm btn-ghost" onClick={toggleAlert}>Ok</button>
 *     </div>
 * </Alert>
 */
export const Alert: Component<Props> = (props) => {

    const [show, setShow] = createSignal(false);

    createEffect(() => {
        if (props.show) {
            setShow(true);
        }

        if (props.timeout) {
            setTimeout(() => {
                setShow(false);
            }, props.timeout);
        }
    });

    function onClose() {
        props.onClose && props.onClose();
    }

    return (
        <Show when={props.show}>
            <Portal>
                <SlideUpTransition appear={true} onExitDone={onClose}>
                    {show() && (
                        <div class="container fixed bottom-2 left-0 right-0">
                            <div
                                class="alert shadow-lg"
                                classList={{
                                    'alert-info': props.type === 'info',
                                    'alert-success': props.type === 'success',
                                    'alert-warning': props.type === 'warning',
                                    'alert-error': props.type === 'error',
                                }}
                            >
                                {props.children}

                                <div class="flex-none">
                                    <button
                                        class="btn btn-sm btn-ghost btn-circle"
                                        onClick={() => setShow(false)}
                                    >
                                        <i class="fa-solid fa-xmark"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </SlideUpTransition>
            </Portal>
        </Show>
    );
};
