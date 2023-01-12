import {DaisySize} from '../../types';
import {createMemo, For, JSX, Show, splitProps} from 'solid-js';

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
} & JSX.InputHTMLAttributes<HTMLInputElement>;

export const Range = (props: Props) => {
  const [local, others] = splitProps(props, [
    'value',
    'min',
    'max',
    'step',
    'onInput',
    'size',
    'color',
    'class',
    'classList',
  ]);

  function change(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = parseInt(target.value, 10);
    local.onInput?.(value);
  }

  const setColor = (color?: RangeColor) => (color ? `range-${color}` : '');
  const setSize = (size?: RangeSize) => (size ? `range-${size}` : '');

  return (
    <>
      <input
        data-testid={RangeSelectors.INPUT}
        type="range"
        min={local.min || 0}
        max={local.max || 100}
        value={local.value}
        step={local.step}
        class={`range ${setColor(local.color)} ${setSize(local.size)} ${
          local.class || ''
        }`}
        classList={{
          'range-lg': local.size === 'lg',
          'range-md': local.size === 'md',
          'range-sm': local.size === 'sm',
          'range-xs': local.size === 'xs',

          'range-primary': local.color === 'primary',
          'range-secondary': local.color === 'secondary',
          'range-accent': local.color === 'accent',
        }}
        onInput={change}
        {...others}
      />

      <Show when={local.step} keyed>
        <Scale max={local.max || 100} step={local.step || 0} />
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
