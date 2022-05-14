import { Component } from 'solid-js';
import { DaisyColor, DaisySize, PropChangeEvent, PropFocusEvent, PropInputEvent } from '../../types';

export const InputSelectors = {
    INPUT: 'input'
}

export type InputColor = DaisyColor | 'ghost';
export type InputSize = DaisySize;

type Props = {
    placeholder?: string;
    type?: string;
    value?: string | number;
    name?: string;
    autocomplete?: string;
    disabled?: boolean;
    ref?: (el: HTMLInputElement) => void;

    color?: InputColor;
    size?: InputSize;
    class?: string;
    error?: boolean;
    bordered?: boolean;

    onChange?: (e: PropChangeEvent<HTMLInputElement>) => void;
    onInput?: (e: PropInputEvent<HTMLInputElement>) => void;
    onFocus?: (e: PropFocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: PropFocusEvent<HTMLInputElement>) => void;
}

export const Input: Component<Props> = (props) => {

    return (
        <input
            data-testid={InputSelectors.INPUT}
            ref={props.ref}
            type={props.type || 'text'}
            placeholder={props.placeholder}
            value={props.value}
            name={props.name}
            autocomplete={props.autocomplete}
            disabled={props.disabled}

            class={`input ${props.class || ''}`}
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
