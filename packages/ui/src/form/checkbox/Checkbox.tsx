import { DaisySize } from '../../types';
import { DOMElement } from 'solid-js/types/jsx';
import { Component, createEffect, createSignal } from 'solid-js';

export const CheckboxSelectors = {
    CHECKBOX: 'checkbox'
};

export type CheckboxInputEvent = InputEvent & { currentTarget: HTMLInputElement; target: DOMElement }
export type CheckboxChangeEvent = Event & { currentTarget: HTMLInputElement; target: DOMElement }
export type CheckboxFocusEvent = FocusEvent & { currentTarget: HTMLInputElement; target: DOMElement }

export type CheckboxColor = 'primary' | 'secondary' | 'accent';
export type CheckboxSize = DaisySize;


export type CheckboxProps = {
    value?: boolean;
    ref?: (el: HTMLInputElement) => void;

    size?: CheckboxSize;
    color?: CheckboxColor;

    onInput?: (e: CheckboxInputEvent) => void;
    onChange?: (e: CheckboxChangeEvent) => void;
    onFocus?: (e: CheckboxFocusEvent) => void;
    onBlur?: (e: CheckboxFocusEvent) => void;

    indeterminate?: boolean;
}

export const Checkbox: Component<CheckboxProps> = (props) => {
    const [ref, setRef] = createSignal<HTMLInputElement>();

    createEffect(() => {
        const input = ref();
        if (input) {
            input.indeterminate = !!props.indeterminate;
        }
    });

    return (
        <input
            data-testid={CheckboxSelectors.CHECKBOX}
            type="checkbox"
            class="checkbox"
            checked={props.value}

            ref={el => {
                el.indeterminate = !!props.indeterminate;
                setRef(el);
                props.ref?.(el);
            }}

            classList={{
                'checkbox-accent': props.color === 'accent',
                'checkbox-primary': props.color === 'primary',
                'checkbox-secondary': props.color === 'secondary',

                'checkbox-lg': props.size === 'lg',
                'checkbox-md': props.size === 'md',
                'checkbox-sm': props.size === 'sm',
                'checkbox-xs': props.size === 'xs',
            }}

            onInput={props.onInput}
            onChange={props.onChange}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
        />
    );
};
