import {
    Component,
    createContext,
    createEffect,
    createSignal,
    JSXElement,
    useContext
} from 'solid-js';
import { SelectDropdown } from './SelectDropdown';
import { DaisyColor, DaisySize } from '../../types';
import { createStore, reconcile } from 'solid-js/store';

export type SelectColor = DaisyColor | 'ghost';
export type SelectSize = DaisySize;

export const SelectSelectors = {
    SELECT: 'select',
    INPUT: 'select-input',
    CUSTOM_VIEW: 'select-custom',
    DROPDOWN: 'select-dropdown',
    OPTION: 'select-option',
    OPTION_BUTTON: 'select-option-btn',
};

type SelectState = {
    _value: any;
    value: any;
    _isOpen: boolean;
    isOpen: boolean;
    isClose: boolean;
    compareKey?: string;
}

export type SelectProps = {
    placeholder?: string;
    name?: string;
    value?: any;
    show?: boolean;

    color?: SelectColor;
    size?: SelectSize;
    class?: string;
    bordered?: boolean;
    error?: boolean;

    onChange?: (e: InputEvent) => void;
    onInput?: (e: string | number) => void;
    onFocus?: (e: InputEvent) => void;
    onBlur?: (e: InputEvent) => void;

    onOpen?: () => void;
    onClose?: () => void;

    customValue?: (v: any) => JSXElement;
    compareKey?: string;
}

export const Select: Component<SelectProps> = (props) => {

    const [reference, setReference] = createSignal<HTMLElement>();

    const [state, setState] = createStore<SelectState>({
        _value: props.value,
        _isOpen: !!props.show,
        compareKey: props.compareKey,

        get value() {
            return this._value;
        },
        get isOpen() {
            return this._isOpen;
        },
        get isClose() {
            return !this._isOpen;
        }
    });

    createEffect(() => {
        const value = props.value;
        setState('_value', reconcile(value, {merge: true}));
    });

    const setValue = (value: any) => {
        if (typeof value === 'object') {
            setState('_value', {...value});
        } else {
            setState('_value', value);
        }

        props.onInput?.(value);
    };

    const open = () => {
        setState('_isOpen', true);
        props.onOpen?.();
    };

    const close = () => {
        setState('_isOpen', false);
        props.onClose?.();
    };

    const check = (value: any) => {
        setValue(value);
        close();
    };

    return (
        <SelectContext.Provider value={{
            state,
            setValue,
            open,
            close,
            check
        }}>
            <div
                data-testid={SelectSelectors.SELECT}
                ref={setReference}
                class={`select z-10 flex items-center ${props.class || ''}`}
                classList={{
                    'select-lg': props.size === 'lg',
                    'select-md': props.size === 'md',
                    'select-sm': props.size === 'sm',
                    'select-xs': props.size === 'xs',

                    'select-primary': props.color === 'primary',
                    'select-secondary': props.color === 'secondary',
                    'select-accent': props.color === 'accent',
                    'select-info': props.color === 'info',
                    'select-success': props.color === 'success',
                    'select-warning': props.color === 'warning',
                    'select-error': props.color === 'error' || props.error,
                    'select-ghost': props.color === 'ghost',

                    'select-bordered': props.bordered,
                }}
                onClick={open}
                onFocus={open}
            >
                <span data-testid={SelectSelectors.CUSTOM_VIEW}>
                    {state.value && props.customValue?.(state.value)}
                </span>

                <input
                    data-testid={SelectSelectors.INPUT}
                    type="text"
                    class="bg-inherit h-full border-none cursor-pointer"
                    classList={{
                        'hidden': !!props.customValue && state.value,
                    }}
                    disabled
                    value={state.value}
                    placeholder={props.placeholder || ''}
                    name={props.name}
                />
            </div>

            <SelectDropdown
                show={state.isOpen}
                reference={reference}
                onClose={close}
            >
                {props.children}
            </SelectDropdown>
        </SelectContext.Provider>
    );
};

type ContextType = {
    state: SelectState;
    setValue: (v: string) => void;
    open: () => void;
    close: () => void;
    check: (v: any) => void;
}

const SelectContext = createContext<ContextType>();

export const useSelect = () => {
    const context = useContext(SelectContext);
    if (context) {
        return context;
    }

    throw new Error('No context for Select');
};
