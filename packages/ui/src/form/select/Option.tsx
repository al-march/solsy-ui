import { Component } from 'solid-js';
import { SelectSelectors, useSelect } from './Select';
import { PropFocusEvent, PropMouseEvent } from '../../types';

type Props = {
    value: string | number;
    disabled?: boolean;
    onClick?: (e: PropMouseEvent) => void;
    onFocus?: (e: PropFocusEvent) => void;
    onBlur?: (e: PropFocusEvent) => void;
}

export const Option: Component<Props> = (props) => {

    const select = useSelect();

    const onClick = (e: PropMouseEvent) => {
        select.check(props.value);
        props.onClick?.(e);
    };

    return (
        <li
            data-testid={SelectSelectors.OPTION}
            classList={{
                disabled: props.disabled,
            }}
        >
            <button
                data-testid={SelectSelectors.OPTION_BUTTON}

                onClick={onClick}
                onFocus={props.onFocus}
                onBlur={props.onBlur}

                class={SelectSelectors.OPTION_BUTTON}
                classList={{
                    active: select.state.value === props.value,
                }}

                disabled={props.disabled}
            >
                {props.children}
            </button>
        </li>
    );
};
