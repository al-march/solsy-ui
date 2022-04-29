import { createSignal, onMount, PropsWithChildren } from 'solid-js';
import { useToggleButtons } from './ButtonsGroup';
import { Button } from '../../actions';

type Props<T = any> = {
    value?: T;
    disabled?: boolean;
    defaultChecked?: boolean;
    onCheck?: (v: any) => void;
}

/**
 * ButtonGroup is used in ToggleButtonGroup component
 *
 * @example
 * <ButtonGroup value={1} defaultChecked>Some text</ButtonGroup>
 */
export const ButtonGroup = (props: PropsWithChildren<Props>) => {

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
    };

    const onClick = () => {
        const v = value();
        buttons.setActiveButton(v);
        props.onCheck?.(v);
    };

    return (
        <Button
            ref={initButton}
            active={isActive()}
            onClick={onClick}
            size={buttons.state.size}
        >
            {props.children}
        </Button>
    );
};
