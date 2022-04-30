import { Component } from 'solid-js';
import { DOMElement } from 'solid-js/jsx-runtime';
import { DaisyColor, DaisySize } from '../../types';

export type InputEvent = Event & { currentTarget: HTMLInputElement; target: DOMElement }

export type InputColor = DaisyColor | 'ghost';
export type InputSize = DaisySize;

type Props = {
    placeholder?: string;
    type?: string;
    value?: string | number;
    name?: string;
    autocomplete?: string;
    disabled?: boolean;

    color?: InputColor;
    size?: InputSize;
    error?: boolean;
    bordered?: boolean;

    onChange?: (e: InputEvent) => void;
    onInput?: (e: InputEvent) => void;
    onFocus?: (e: InputEvent) => void;
    onBlur?: (e: InputEvent) => void;
}

export const Input: Component<Props> = (props) => {

    return (
        <input
            data-testid="input"
            type={props.type || 'text'}
            placeholder={props.placeholder}
            value={props.value}
            name={props.name}
            autocomplete={props.autocomplete}
            disabled={props.disabled}

            class="input"
            classList={{
                'input-lg': props.size === 'lg',
                'input-md': props.size === 'md',
                'input-sm': props.size === 'sm',
                'input-xs': props.size === 'xs',

                'input-primary':   props.color === 'primary',
                'input-secondary': props.color === 'secondary',
                'input-accent':    props.color === 'accent',
                'input-info':      props.color === 'info',
                'input-success':   props.color === 'success',
                'input-warning':   props.color === 'warning',
                'input-error':     props.color === 'error' || props.error,
                'input-ghost':     props.color === 'ghost',

                'input-bordered': props.bordered
            }}

            onChange={props.onChange}
            onInput={props.onInput}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
        />
    );
};
