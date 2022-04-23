import { createSignal, createContext, useContext, Accessor, Component } from 'solid-js';
import { SelectionModel } from './utils/selection.model';

type ContextType<T = any> = {
    activeBtn: Accessor<SelectionModel<T | undefined>>;
    setActive: (btnIndex: T) => void;
}

const ButtonToggleContext = createContext<ContextType>();

type Props = {
    onChange?: (value: any[]) => void;
    defaultValue?: any;
    multiple?: boolean;
}

export const ToggleButtonsProvider: Component<Props> = (props) => {

    const model = new SelectionModel();

    if (Array.isArray(props.defaultValue)) {
        props.defaultValue.forEach(v => model.add(v));
    } else {
        model.add(props.defaultValue);
    }


    const [activeBtn, setActiveBtn] = createSignal(model);

    const store: ContextType = {
        activeBtn,
        setActive(btnValue) {
            if (activeBtn().has(btnValue)) {
                const value = removeValue(btnValue);
                setActiveBtn(value);
            } else {
                const value = addValue(btnValue);
                setActiveBtn(value);
            }

            if (props.onChange) {
                props.onChange(Array.from(activeBtn().get()));
            }
        }
    };

    function addValue(value: any) {
        if (props.multiple) {
            return new SelectionModel(model.add(value));
        } else {
            return new SelectionModel(model.clear().add(value));
        }
    }

    function removeValue(value: any) {
        return new SelectionModel(model.remove(value));
    }

    return (
        <ButtonToggleContext.Provider value={store}>
            {props.children}
        </ButtonToggleContext.Provider>
    );
};

export const useToggleButtons = () => useContext(ButtonToggleContext)!;
