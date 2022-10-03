import {DaisySize} from '../../types';
import {createMemo, For, Show} from 'solid-js';

export type RangeSize = DaisySize;
export type RangeColor = 'primary' | 'secondary' | 'accent';

export const RangeSelectors = {
  INPUT: 'range',
  STEPS: 'range-steps',
  STEP: 'range-step',
};

type Props = {
  value?: number;
  min?: number;
  max?: number;
  step?: number;

  onInput?: (v: number) => void;

  size?: RangeSize;
  color?: RangeColor;
  class?: string;
};

export const Range = (props: Props) => {
  function change(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = parseInt(target.value, 10);
    props.onInput?.(value);
  }

  const setColor = (color?: RangeColor) => (color ? `range-${color}` : '');
  const setSize = (size?: RangeSize) => (size ? `range-${size}` : '');

  return (
    <>
      <input
        data-testid={RangeSelectors.INPUT}
        type="range"
        min={props.min || 0}
        max={props.max || 100}
        value={props.value}
        step={props.step}
        class={`range ${setColor(props.color)} ${setSize(props.size)} ${
          props.class || ''
        }`}
        classList={{
          'range-lg': props.size === 'lg',
          'range-md': props.size === 'md',
          'range-sm': props.size === 'sm',
          'range-xs': props.size === 'xs',

          'range-primary': props.color === 'primary',
          'range-secondary': props.color === 'secondary',
          'range-accent': props.color === 'accent',
        }}
        onInput={change}
      />

      <Show when={props.step}>
        <Scale max={props.max || 100} step={props.step || 0} />
      </Show>
    </>
  );
};

type ScaleProps = {
  max: number;
  step: number;
};

const Scale = (props: ScaleProps) => {
  const steps = createMemo(() =>
    new Array(Math.round(props.max / props.step) + 1).fill(0)
  );

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
