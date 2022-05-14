import { Component, createContext, createSignal, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Input, InputColor, InputSize } from '../input';
import { Menu } from '../../navigation';
import { PropChangeEvent, PropFocusEvent, PropInputEvent } from '../../types';
import { BackdropClick } from '../../utils';

export const AutocompleteSelectors = {
    AUTOCOMPLETE: 'input',
    DROPDOWN: 'dropdown',
    OPTION: 'option',
};

type AutocompleteState = {
    _value: string;
    value: string;
    _isOpen: boolean;
    isOpen: boolean;
    isClose: boolean;
}

export type AutocompleteProps = {
    value?: string;
    show?: boolean;
    placeholder?: string;
    ref?: (el: HTMLInputElement) => void;

    color?: InputColor;
    size?: InputSize;
    class?: string;
    error?: boolean;
    bordered?: boolean;
    disabled?: boolean;

    onInput?: (e: PropInputEvent<HTMLInputElement>) => void;
    onChange?: (e: PropChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: PropFocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: PropFocusEvent<HTMLInputElement>) => void;
}

export const Autocomplete: Component<AutocompleteProps> = (props) => {

    const [ref, setRef] = createSignal<HTMLElement>();
    const [state, setState] = createStore<AutocompleteState>({
        _value: props.value || '',
        _isOpen: !!props.show,
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

    const setValue = (v: any) => {
        setState('_value', v);
    };

    const checkOption = (v: any) => {
        setValue(v);
        setState('_isOpen', false);
    };

    const onInput = (e: PropInputEvent<HTMLInputElement>) => {
        setValue((e.target as HTMLInputElement).value);
        props.onInput?.(e);
    };

    const onFocus = (e: PropFocusEvent<HTMLInputElement>) => {
        setState('_isOpen', true);
        props.onFocus?.(e);
    };

    const onBackdropClick = (e: Event) => {
        const target = e.target as HTMLElement;
        if (ref()?.contains(target)) {
            return;
        }
        setState('_isOpen', false);
    };

    return (
        <AutocompleteContext.Provider value={{
            state,
            setValue,
            checkOption,
        }}>
            <Input
                data-testid={AutocompleteSelectors.AUTOCOMPLETE}
                ref={el => {
                    setRef(el);
                    props.ref?.(el);
                }}
                value={state.value}
                placeholder={props.placeholder}

                size={props.size}
                color={props.color}
                class={props.class}

                error={props.error}
                bordered={props.bordered}
                disabled={props.disabled}
                autocomplete="off"

                onInput={onInput}
                onFocus={onFocus}
                onBlur={props.onBlur}
                onChange={props.onChange}
            />

            <Menu reference={ref()} isShow={state.isOpen}>
                <BackdropClick onBackdropClick={onBackdropClick}>
                    <div
                        data-testid={AutocompleteSelectors.DROPDOWN}
                        class="max-h-60 overflow-y-scroll"
                        style={{width: ref()?.offsetWidth + 'px'}}
                    >
                        {props.children}
                    </div>
                </BackdropClick>
            </Menu>
        </AutocompleteContext.Provider>
    );
};

type AutocompleteContext = {
    state: AutocompleteState;
    setValue: (v: any) => void;
    checkOption: (v: any) => void;
}

const AutocompleteContext = createContext<AutocompleteContext>();

export const useAutocomplete = () => {
    const ctx = useContext(AutocompleteContext);
    if (ctx) {
        return ctx;
    }
    throw new Error('No context for autocomplete');
};
