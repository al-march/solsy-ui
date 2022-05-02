import { Accessor, Component, createEffect, createSignal, onMount, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { SelectTypeEnum } from './Select.type';
import { BackdropClick, ScaleTransition, usePopper } from '../../utils';

type Props = {
    isShow: boolean;
    reference: Accessor<HTMLElement | undefined>;
    onClose?: () => void;
}

export const SelectDropdown: Component<Props> = (props) => {

    const [show, setShow] = createSignal(true);
    const [dropdown, setDropdown] = createSignal<HTMLElement>();

    usePopper(props.reference, dropdown, {
        modifiers: [{
            name: 'offset',
            options: {
                offset: [0, 8],
            },
        }]
    });

    createEffect(() => {
        setShow(props.isShow);
    });

    onMount(() => {
        focusOption();
    });

    function focusOption() {
        const optionsRef = dropdown()?.querySelector(`.${SelectTypeEnum.OPTION_SELECTOR}`) as HTMLButtonElement;
        if (optionsRef) {
            optionsRef.focus();
        }
    }

    function onBackdropClick(e: Event) {
        const target = e.target as HTMLElement;
        if (props.reference()?.contains(target)) {
            return;
        }

        setShow(false);
    }

    return (
        <Portal>
            <BackdropClick
                onBackdropClick={onBackdropClick}
            >
                <div
                    ref={setDropdown}
                    style={{'min-width': props.reference()?.offsetWidth + 'px'}}
                >
                    <ScaleTransition
                        appear={true}
                        onExit={() => props.onClose?.()}
                    >
                        <Show when={show()}>
                            <div class="shadow-lg menu dropdown-content bg-base-200 max-h-60 overflow-y-scroll">
                                {props.children}
                            </div>
                        </Show>
                    </ScaleTransition>
                </div>
            </BackdropClick>
        </Portal>
    );
};
