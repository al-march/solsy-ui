import { Component } from 'solid-js';
import { useSelect } from './Select';
import { SelectTypeEnum } from './Select.type';

type Props = {
    value: string;
}

export const Option: Component<Props> = (props) => {

    const select = useSelect();

    return (
        <li>
            <button
                onClick={() => select.setValue(props.value)}
                class={SelectTypeEnum.OPTION_SELECTOR}
                classList={{active: select.value() === props.value}}
            >
                {props.children}
            </button>
        </li>
    );
};
