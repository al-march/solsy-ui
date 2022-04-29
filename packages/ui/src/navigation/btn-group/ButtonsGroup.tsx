import { Component, createContext, createSignal, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { DaisySize } from '../../types';

export const ButtonsGroupSelectors = {
    GROUP: 'button-group',
    BUTTON: 'button',
};

export type ButtonGroupSize = DaisySize;

type ButtonsGroupState = {
    _activeButtons: Set<any>;
    activeButtons: Set<any>;
    size?: ButtonGroupSize;
}

type ButtonsGroupContext = {
    state: ButtonsGroupState;
    initButton: (node: HTMLElement) => number;
    setActiveButton: (v: any) => void;
}

const ButtonsGroupContext = createContext<ButtonsGroupContext>();

export type ButtonsGroupProps = {
    value?: any | any[];
    multiple?: boolean;
    onInput?: (v: any) => void;
    size?: ButtonGroupSize;
}

/**
 * ButtonsGroup
 *
 * @example
 * <ButtonsGroup
 *     onInput={(v) => setActiveBtn(v)}
 *     value={activeBtn()}
 *     multiple
 * >
 *     <ButtonGroup>1</ButtonGroup>
 *     <ButtonGroup>2</ButtonGroup>
 *     <ButtonGroup>3</ButtonGroup>
 * </ButtonsGroup>
 */
export const ButtonsGroup: Component<ButtonsGroupProps> = (props) => {

    const [buttons, setButtons] = createSignal<HTMLElement[]>([]);
    const [state, setState] = createStore<ButtonsGroupState>({
        _activeButtons: initActiveButtons(),
        get activeButtons() {
            return this._activeButtons;
        },
        get size() {
            return props.size;
        }
    });

    function initActiveButtons() {
        const output = new Set();
        const value = props.value;

        if (!value) {
            return output;
        }

        if (Array.isArray(value)) {
            if (props.multiple) {
                value.forEach(v => output.add(v));
            } else {
                output.add(value[value.length - 1]);
            }
        } else {
            output.add(value);
        }
        return output;
    }

    function initButton(node: HTMLElement) {
        setButtons(buttons => ([...buttons, node]));
        return buttons().length - 1;
    }

    function setActiveButton(value: any) {
        const set = new Set(state.activeButtons);

        if (set.has(value)) {
            set.delete(value);
        } else {
            addValue(value, set);
        }

        updateValue(set);
    }

    function addValue(value: any, set: Set<any>) {
        if (props.multiple) {
            set.add(value);
        } else {
            set.clear();
            set.add(value);
        }
    }

    function updateValue(set: Set<any>) {
        setState('_activeButtons', set);
        const emitValue = props.multiple
            ? Array.from(set)
            : Array.from(set)[0];
        props.onInput?.(emitValue);
    }

    return (
        <ButtonsGroupContext.Provider value={{
            state,
            initButton,
            setActiveButton,
        }}>
            <div
                data-testid={ButtonsGroupSelectors.GROUP}
                class="btn-group"
            >
                {props.children}
            </div>
        </ButtonsGroupContext.Provider>
    );
};

export const useToggleButtons = () => {
    const context = useContext(ButtonsGroupContext);
    if (context) {
        return context;
    }
    throw new Error('No context for ToggleButtons');
};
