import { Component } from 'solid-js';

type Props = {
    full?: boolean;
    class?: string;
}

export const Page: Component<Props> = (props) => {

    return (
        <div
            class={props.class}
            classList={{
                'flex-1': !!props.full
            }}
        >
            {props.children}
        </div>
    );
};
