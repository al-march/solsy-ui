import {
    Component,
    createContext,
    createEffect,
    createSignal,
    Show,
    useContext
} from 'solid-js';
import { SelectDropdown } from './SelectDropdown';
import { DaisyColor, DaisySize } from '../../types';

type ContextType = {
    value: any;
    setValue: (v: string) => void;
}

const SelectContext = createContext<ContextType>();

type Props = {
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
}

export const Select: Component<Props> = (props) => {

    const [reference, setReference] = createSignal<HTMLElement>();
    const [value, setValue] = createSignal('');
    const [state, setState] = createSignal({
        isHasDropdown: false,
        isShowDropdown: false,
    });

    createEffect(() => {
        const value = (props.value || '') as string;
        setValue(value);
    });

    function setControlValue(value: string) {
        setValue(value);
        props.onInput?.(value);
    }

    function showDropdown() {
        setState(state => ({
            ...state,
            isHasDropdown: true,
            isShowDropdown: true,
        }));
    }

    function destroyDropdown() {
        const isHasDropdown = false;
        setState(state => ({...state, isHasDropdown}));
    }

    function hideDropdown() {
        const isShowDropdown = false;
        setState(state => ({...state, isShowDropdown}));
    }

    function optionChecked(value: any) {
        setControlValue(value);
        hideDropdown();
    }

    const store: ContextType = {
        value,
        setValue: optionChecked
    };

    return (
        <SelectContext.Provider value={store}>
            <input
                ref={setReference}
                class="select"
                classList={{
                    'select-bordered': props.bordered,
                }}
                value={value()}
                placeholder={props.placeholder || ''}
                name={props.name}
                onClick={showDropdown}
                onFocus={showDropdown}
            />

            <Show when={state().isHasDropdown}>
                <SelectDropdown
                    isShow={state().isShowDropdown}
                    reference={reference}
                    onClose={destroyDropdown}
                >
                    {props.children}
                </SelectDropdown>
            </Show>
        </SelectContext.Provider>
    );
};

export const useSelect = () => useContext(SelectContext)!;
