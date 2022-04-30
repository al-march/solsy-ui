import { Component, createMemo, For, Show } from 'solid-js';

export const RangeSelectors = {
    INPUT: 'range',
    STEPS: 'range-steps',
    STEP: 'range-step'
};

type Props = {
    value?: number;
    min?: number;
    max?: number;
    step?: number;

    onInput?: (v: number) => void;
}

export const Range: Component<Props> = (props) => {
    function change(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = parseInt(target.value, 10);
        props.onInput?.(value);
    }

    return (
        <>
            <input
                data-testid={RangeSelectors.INPUT}
                type="range"
                min={props.min || 0}
                max={props.max || 100}
                value={props.value}
                step={props.step}
                class="range"

                onInput={change}
            />

            <Show when={props.step}>
                <Scale max={props.max || 100} step={props.step || 0}/>
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
        <div
            data-testid={RangeSelectors.STEPS}
            class="w-full flex justify-between text-xs px-2"
        >
            <For each={steps()}>
                {() => <span data-testid={RangeSelectors.STEP}>|</span>}
            </For>
        </div>
    );
};
