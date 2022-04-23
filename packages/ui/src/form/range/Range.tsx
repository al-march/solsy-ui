import { Component, createMemo, For, Show } from 'solid-js';

type Props = {
    value?: number;
    min?: number;
    max?: number;
    step?: number;

    onChange?: (v: number) => void;
}

export const Range: Component<Props> = (props) => {
    function change(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = parseInt(target.value, 10);
        props.onChange?.(value);
    }

    return (
        <>
            <input
                type="range"
                min={props.min || 0}
                max={props.max || 100}
                value={props.value}
                step={props.step}
                class="range"

                onInput={change}
            />

            <Show when={props.step}>
                <Scale max={props.max || 100} step={props.step!}/>
            </Show>
        </>
    );
};

type ScaleProps = {
    max: number;
    step: number;
}

const Scale: Component<ScaleProps> = (props) => {
    const steps = createMemo(() => new Array(Math.round(props.max / props.step) + 1).fill(0));

    return (
        <div class="w-full flex justify-between text-xs px-2">
            <For each={steps()}>
                {() => <span>|</span>}
            </For>
        </div>
    );
};
