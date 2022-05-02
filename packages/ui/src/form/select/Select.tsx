import {
    Component,
    createContext,
    createEffect,
    createSignal,
    useContext
} from 'solid-js';
import { SelectDropdown } from './SelectDropdown';
import { DaisyColor, DaisySize } from '../../types';
import { createStore } from 'solid-js/store';

export const SelectSelectors = {
    SELECT: 'select',
    OPTION: 'select-option',
    DROPDOWN: 'select-dropdown',
};

type SelectState = {
    _value: any;
    value: any;
    _isOpen: boolean;
    isOpen: boolean;
    isClose: boolean;
}

export type SelectProps = {
    placeholder?: string;
    name?: string;
    value?: string | number;

    color?: DaisyColor;
    size?: DaisySize;
    bordered?: boolean;

    onChange?: (e: InputEvent) => void;
    onInput?: (e: string | number) => void;
    onFocus?: (e: InputEvent) => void;
    onBlur?: (e: InputEvent) => void;

    onOpen?: () => void;
    onClose?: () => void;
}

export const Select: Component<SelectProps> = (props) => {

    const [reference, setReference] = createSignal<HTMLElement>();

    const [state, setState] = createStore<SelectState>({
        _value: props.value,
        _isOpen: false,
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
        const value = (props.value || '') as string;
        setState('_value', value);
    });

    const setValue = (value: string) => {
        setState('_value', value);
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
            <input
                data-testid={SelectSelectors.SELECT}
                ref={setReference}
                class="select"
                classList={{
                    'select-bordered': props.bordered,
                }}
                value={state.value}
                placeholder={props.placeholder || ''}
                name={props.name}
                onClick={open}
                onFocus={open}
            />

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
