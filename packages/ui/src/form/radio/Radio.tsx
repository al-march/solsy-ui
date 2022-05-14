import { DaisySize, PropChangeEvent, PropFocusEvent, PropInputEvent } from '../../types';
import { Component } from 'solid-js';

export const RadioSelector = {
    RADIO: 'radio'
};

export type RadioColor = 'primary' | 'secondary' | 'accent';
export type RadioSize = DaisySize;

export type RadioProps = {
    value?: boolean;
    name?: string;

    size?: RadioSize;
    color?: RadioColor;
    class?: string;

    onInput?: (e: PropInputEvent) => void;
    onChange?: (e: PropChangeEvent) => void;
    onFocus?: (e: PropFocusEvent) => void;
    onBlur?: (e: PropFocusEvent) => void;
}

export const Radio: Component<RadioProps> = (props) => {
    return (
        <input
            data-testid={RadioSelector.RADIO}
            type="radio"
            name={props.name}
            checked={props.value}

            class={`radio ${props.class || ''}`}
            classList={{
                'radio-accent': props.color === 'accent',
                'radio-primary': props.color === 'primary',
                'radio-secondary': props.color === 'secondary',

                'radio-lg': props.size === 'lg',
                'radio-md': props.size === 'md',
                'radio-sm': props.size === 'sm',
                'radio-xs': props.size === 'xs',
            }}

            onInput={props.onInput}
            onChange={props.onChange}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
        />
    );
};
