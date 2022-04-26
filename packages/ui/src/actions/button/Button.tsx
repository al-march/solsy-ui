import { Component } from 'solid-js';
import { DOMElement } from 'solid-js/jsx-runtime';
import { DaisyColor, DaisySize } from '../../types';

type ClickButtonEvent = MouseEvent & { currentTarget: HTMLButtonElement; target: DOMElement };
type FocusButtonEvent = FocusEvent & { currentTarget: HTMLButtonElement; target: DOMElement };

type ButtonColor = DaisyColor | 'ghost';

type Props = {
    disabled?: boolean;
    active?: boolean;
    type?: string;

    class?: string;

    color?: ButtonColor;
    size?: DaisySize;
    link?: boolean;
    outline?: boolean;
    glass?: boolean;

    noAnimation?: boolean;
    loading?: boolean;

    wide?: boolean;
    block?: boolean;
    circle?: boolean;
    square?: boolean;

    onClick?: (e: ClickButtonEvent) => void;
    onFocus?: (e: FocusButtonEvent) => void;
    onBlur?: (e: FocusButtonEvent) => void;
}

export const Button: Component<Props> = (props) => {

    return (
        <button
            onClick={props.onClick}
            onFocus={props.onFocus}
            onBlur={props.onBlur}

            disabled={props.disabled}
            class={`btn ${props.class || ''}`}
            classList={{
                'btn-lg': props.size === 'lg',
                'btn-md': props.size === 'md',
                'btn-sm': props.size === 'sm',
                'btn-xs': props.size === 'xs',

                'btn-primary':   props.color === 'primary',
                'btn-secondary': props.color === 'secondary',
                'btn-accent':    props.color === 'accent',
                'btn-info':      props.color === 'info',
                'btn-success':   props.color === 'success',
                'btn-warning':   props.color === 'warning',
                'btn-error':     props.color === 'error',
                'btn-ghost':     props.color === 'ghost',
                'btn-link':      props.link,

                'btn-outline':   props.outline,
                'btn-active':    props.active,
                'btn-disabled':  props.disabled,
                'btn-circle':    props.circle,
                'btn-square':    props.square,
                'loading':       props.loading,
                'glass':         props.glass
            }}
        >
            {props.children}
        </button>
    )
}
