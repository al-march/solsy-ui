import { DaisySize } from '../../types';
import { Component, createEffect, createSignal } from 'solid-js';
import { DOMElement } from 'solid-js/types/jsx';

export type ToggleInputEvent = InputEvent & { currentTarget: HTMLInputElement; target: DOMElement }
export type ToggleChangeEvent = Event & { currentTarget: HTMLInputElement; target: DOMElement }

export const ToggleSelectors = {
    INPUT: 'toggle'
};

export type ToggleColor = 'primary' | 'secondary' | 'accent';
export type ToggleSize = DaisySize;

type ToggleClasses = {
    main: string,
    colors: Record<ToggleColor, string>,
    sizes: Record<ToggleSize, string>
}

export const addPrefix = (name: string) => `toggle-${name}`;

export const ToggleClasses: ToggleClasses = {
    main: 'toggle',
    colors: {
        accent: addPrefix('accent'),
        primary: addPrefix('primary'),
        secondary: addPrefix('secondary'),
    },
    sizes: {
        lg: addPrefix('lg'),
        md: addPrefix('md'),
        sm: addPrefix('sm'),
        xs: addPrefix('xs'),
    }
};

export type ToggleProps = {
    value?: boolean;

    onInput?: (v: ToggleInputEvent) => void;
    onChange?: (v: ToggleChangeEvent) => void;
    ref?: (el: HTMLInputElement) => void;

    color?: ToggleColor;
    size?: ToggleSize;

    indeterminate?: boolean
}
export const Toggle: Component<ToggleProps> = (props) => {

    const [ref, setRef] = createSignal<HTMLInputElement>();

    createEffect(() => {
        const input = ref();
        if (input) {
            input.indeterminate = !!props.indeterminate;
        }
    });

    return (
        <input
            data-testid={ToggleSelectors.INPUT}
            ref={el => {
                el.indeterminate = !!props.indeterminate;
                setRef(el);
                props.ref?.(el);
            }}
            class={ToggleClasses.main}
            classList={{
                [ToggleClasses.colors.accent]: props.color === 'accent',
                [ToggleClasses.colors.primary]: props.color === 'primary',
                [ToggleClasses.colors.secondary]: props.color === 'secondary',

                [ToggleClasses.sizes.lg]: props.size === 'lg',
                [ToggleClasses.sizes.md]: props.size === 'md',
                [ToggleClasses.sizes.sm]: props.size === 'sm',
                [ToggleClasses.sizes.xs]: props.size === 'xs',
            }}
            type="checkbox"
            checked={props.value}

            onInput={props.onInput}
            onChange={props.onChange}
        />
    );
};
