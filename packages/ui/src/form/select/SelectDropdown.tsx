import { Accessor, Component, createEffect, createSignal, onCleanup, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { BackdropClick, ScaleTransition, usePopper } from '../../utils';
import { SelectSelectors } from './Select';
import { createStore } from 'solid-js/store';

type Props = {
    show: boolean;
    reference: Accessor<HTMLElement | undefined>;
    onClose?: () => void;
}

export const SelectDropdown: Component<Props> = (props) => {
    const [dropdown, setDropdown] = createSignal<HTMLElement>();
    const [state, setState] = createStore({
        isRender: props.show,
        isOpen: props.show,
    });

    createEffect(() => {
        if (props.show) {
            setState('isRender', true);
            setState('isOpen', true);
            focusOption();
        } else {
            setState('isOpen', false);
        }
    });

    onCleanup(() => {
        instance()?.destroy();
    });

    const instance = usePopper(props.reference, dropdown, {
        modifiers: [{
            name: 'offset',
            options: {
                offset: [0, 8],
            },
        }]
    });

    function focusOption() {
        const optionsRef = dropdown()
            ?.querySelector(`.${SelectSelectors.OPTION}`) as HTMLButtonElement;

        if (optionsRef) {
            optionsRef.focus();
        }
    }

    const onBackdropClick = (e: Event) => {
        const target = e.target as HTMLElement;
        if (props.reference()?.contains(target)) {
            return;
        }

        setState('isOpen', false);
        props.onClose?.();
    };

    const destroy = () => {
        setState('isRender', false);
    };

    return (
        <Show when={state.isRender}>
            <Portal>
                <BackdropClick
                    onBackdropClick={onBackdropClick}
                >
                    <div
                        data-testid={SelectSelectors.DROPDOWN}
                        ref={setDropdown}
                        style={{'min-width': props.reference()?.offsetWidth + 'px'}}
                    >
                        <ScaleTransition
                            appear={true}
                            onExit={destroy}
                        >
                            <Show when={state.isOpen}>
                                <div class="shadow-lg menu dropdown-content bg-base-200 max-h-60 overflow-y-scroll">
                                    {props.children}
                                </div>
                            </Show>
                        </ScaleTransition>
                    </div>
                </BackdropClick>
            </Portal>
        </Show>
    );
};
