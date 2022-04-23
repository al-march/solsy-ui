import { Component } from 'solid-js';

type Props = {
    onClick?: () => void;
}

export const Overlay: Component<Props> = (props) => {
    return (
        <div class="overlay" onClick={() => props.onClick && props.onClick()}>
            {props.children}
        </div>
    );
};