import { createSignal, onMount, PropsWithChildren } from 'solid-js';
import { ButtonsGroupSelectors, useToggleButtons } from './ButtonsGroup';

type Props<T = any> = {
    value?: T;
    disabled?: boolean;
    defaultChecked?: boolean;
    onCheck?: (v: any) => void;
}

/**
 * ButtonsGroupItem is used in ToggleButtonGroup component
 *
 * @example
 * <ButtonsGroupItem value={1} defaultChecked>Some text</ButtonsGroupItem>
 */
export const ButtonsGroupItem = (props: PropsWithChildren<Props>) => {

    const [value, setValue] = createSignal(props.value);
    const buttons = useToggleButtons();

    onMount(() => {
        if (props.defaultChecked) {
            buttons.setActiveButton(value());
        }
    });

    const isActive = () => buttons.state.activeButtons.has(value());

    const initButton = (el: HTMLElement) => {
        const index = buttons.initButton(el);
        const v = value();
        if (!v) {
            setValue(index);
        }
    }

    const onClick = () => {
        const v = value();
        buttons.setActiveButton(v);
        props.onCheck?.(v);
    }

    return (
        <button
            data-testid={ButtonsGroupSelectors.BUTTON}
            ref={initButton}
            class="btn"
            classList={{
                'btn-active': isActive(),
                'btn-disabled': props.disabled,
            }}
            onClick={onClick}
        >
            {props.children}
        </button>
    );
};
