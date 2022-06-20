import { Component } from 'solid-js';
import { DaisyColor, PropChangeEvent, PropFocusEvent, PropInputEvent } from '../../types';

export const TextareaSelectors = {
    TEXTAREA: 'textarea'
};

export type TextareaColors = DaisyColor | 'ghost';

export type TextareaProps = {
    placeholder?: string;
    value?: string | number;
    name?: string;
    autocomplete?: string;
    disabled?: boolean;
    ref?: (el: HTMLTextAreaElement) => void;

    id?: string;
    cols?: number;
    rows?: number;
    autosize?: boolean;
    resize?: boolean;

    color?: TextareaColors;
    class?: string;
    error?: boolean;
    bordered?: boolean;

    onChange?: (e: PropChangeEvent<HTMLTextAreaElement>) => void;
    onInput?: (e: PropInputEvent<HTMLTextAreaElement>) => void;
    onFocus?: (e: PropFocusEvent<HTMLTextAreaElement>) => void;
    onBlur?: (e: PropFocusEvent<HTMLTextAreaElement>) => void;
}

export const Textarea: Component<TextareaProps> = (props) => {
    const onInput = (e: PropInputEvent<HTMLTextAreaElement>) => {
        if (props.autosize) {
            const ref = e.currentTarget;
            ref.style.height = 'auto';
            ref.style.height = ref.scrollHeight + 'px';
        }

        props.onInput?.(e);
    };

    return (
        <textarea
            data-testid={TextareaSelectors.TEXTAREA}
            ref={props.ref}
            placeholder={props.placeholder}
            value={props.value}
            name={props.name}
            autocomplete={props.autocomplete}
            disabled={props.disabled}

            id={props.id}
            cols={props.cols}
            rows={props.rows || 1}

            style={{
                'resize': props.resize ? '' : 'none'
            }}
            class={`textarea h-auto min-h-0 ${props.class || ''}`}
            classList={{
                'textarea-primary':   props.color === 'primary',
                'textarea-secondary': props.color === 'secondary',
                'textarea-accent':    props.color === 'accent',
                'textarea-info':      props.color === 'info',
                'textarea-success':   props.color === 'success',
                'textarea-warning':   props.color === 'warning',
                'textarea-error':     props.color === 'error' || props.error,
                'textarea-ghost':     props.color === 'ghost',

                'textarea-bordered': props.bordered,
                'overflow-hidden': !!props.autosize,
            }}

            onChange={props.onChange}
            onInput={onInput}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
        >{props.children}</textarea>
    );
};
