import { Component, createEffect, createSignal, Show } from 'solid-js';
import { ScaleTransition } from '../../utils';

type Props = {
    show: boolean;
}

export const FormError: Component<Props> = (props) => {
    const [show, setShow] = createSignal(false);

    createEffect(() => {
        if (props.show) {
            setShow(true);
        }
    });

    return (
        <Show when={show()}>
            <ScaleTransition appear={true} onExit={() => setShow(false)}>
                {props.show && (
                    <i class="text-xs text-error absolute -bottom-4 left-0">
                        {props.children}
                    </i>
                )}
            </ScaleTransition>
        </Show>
    );
};
