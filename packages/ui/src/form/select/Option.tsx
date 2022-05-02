import { Component } from 'solid-js';
import { SelectSelectors, useSelect } from './Select';

type Props = {
    value: string | number;
}

export const Option: Component<Props> = (props) => {

    const select = useSelect();

    return (
        <li>
            <button
                data-testid={SelectSelectors.OPTION}
                onClick={() => select.check(props.value)}
                class={SelectSelectors.OPTION}
                classList={{active: select.state.value === props.value}}
            >
                {props.children}
            </button>
        </li>
    );
};
