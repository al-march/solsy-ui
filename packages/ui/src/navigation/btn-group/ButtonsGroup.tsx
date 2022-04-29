import { Component, createContext, createSignal, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

export const ButtonsGroupSelectors = {
    GROUP: 'button-group',
    BUTTON: 'button',
};

type ButtonsGroupState = {
    _activeButtons: Set<any>;
    activeButtons: Set<any>;
}

type ButtonsGroupContext = {
    state: ButtonsGroupState;
    initButton: (node: HTMLElement) => number;
    setActiveButton: (v: any) => void;
}

const ToggleButtonsContext = createContext<ButtonsGroupContext>();

export type ButtonsGroupProps = {
    value?: any | any[];
    multiple?: boolean;
    onInput?: (v: any) => void;
}

/**
 * Создает контекст для управления состояния ButtonsGroupItem
 *
 * @example
 * <ButtonsGroup
 *     onInput={(v) => setActiveBtn(v)}
 *     value={activeBtn()}
 *     multiple
 * >
 *     <ButtonsGroupItem value={1}>1</ButtonsGroupItem>
 *     <ButtonsGroupItem value={2}>2</ButtonsGroupItem>
 *     <ButtonsGroupItem value={3}>3</ButtonsGroupItem>
 * </ButtonsGroup>
 */
export const ButtonsGroup: Component<ButtonsGroupProps> = (props) => {

    const [buttons, setButtons] = createSignal<HTMLElement[]>([]);
    const [state, setState] = createStore<ButtonsGroupState>({
        _activeButtons: initActiveButtons(),
        get activeButtons() {
            return this._activeButtons;
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
        <ToggleButtonsContext.Provider value={{
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
        </ToggleButtonsContext.Provider>
    );
};

export const useToggleButtons = () => {
    const context = useContext(ToggleButtonsContext);
    if (context) {
        return context;
    }
    throw new Error('No context for ToggleButtons');
};
