import { Component } from 'solid-js';

type Props = {
    active?: boolean;
    onClick?: () => void;
}

export const MenuOption: Component<Props> = (props) => {
    return (
        <li>
            <a
                onClick={() => props.onClick && props.onClick()}
                classList={{'active': !!props.active}}
            >
                {props.children}
            </a>
        </li>
    );
};