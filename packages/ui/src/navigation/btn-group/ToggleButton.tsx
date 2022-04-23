import { onMount, PropsWithChildren } from 'solid-js';
import { useToggleButtons } from './ToggleButtonProvider';

type Props<T = any> = {
    value: T;
    disabled?: boolean;
    defaultChecked?: boolean;
    onCheck?: (v: T) => void;
}

/**
 * Компонент кнопки для ToggleButtonGroup.
 * Использует контекст группы для определения состояния
 *
 * @example
 * <ToggleButton value={1} defaultChecked>Some text</ToggleButton>
 */
export const ToggleButton = <T extends any = any>(props: PropsWithChildren<Props<T>>) => {

    const {activeBtn, setActive} = useToggleButtons();

    /*
    * Помечаем кнопку как активную,
    * если указан соответсвующй пропс
    */
    onMount(() => {
        if (props.defaultChecked) {
            setActive(props.value);
        }
    });

    /*
    * Помечаем как активную,
    * игнорируем если уже активна
    */
    function onClick() {
        setActive(props.value);
        if (props.onCheck) {
            props.onCheck(props.value);
        }
    }

    return (
        <button
            class="btn"
            classList={{
                'btn-active': activeBtn().has(props.value),
                'btn-disabled': props.disabled,
            }}
            onClick={onClick}
        >
            {props.children}
        </button>
    );
};