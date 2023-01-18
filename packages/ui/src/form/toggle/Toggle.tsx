import {DaisySize} from '../../types';
import {
  createEffect,
  createSignal,
  JSX,
  mergeProps,
  splitProps,
} from 'solid-js';

export const ToggleSelectors = {
  INPUT: 'toggle',
};

export type ToggleColor = 'primary' | 'secondary' | 'accent';
export type ToggleSize = DaisySize;

type InputProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'value'>;

export type ToggleProps = {
  value?: boolean;
  ref?: (el: HTMLInputElement) => void;
  indeterminate?: boolean;
  size?: ToggleSize;
  color?: ToggleColor;
} & InputProps;

export const Toggle = (props: ToggleProps) => {
  const [ref, setRef] = createSignal<HTMLInputElement>();
  const pr = mergeProps({class: '', classList: {}}, props);
  const [local, others] = splitProps(pr, [
    'value',
    'ref',
    'indeterminate',
    'size',
    'color',
    'class',
    'classList',
  ]);

  createEffect(() => {
    const input = ref();
    if (input) {
      input.indeterminate = !!local.indeterminate;
    }
  });

  return (
    <input
      data-testid={ToggleSelectors.INPUT}
      ref={el => {
        el.indeterminate = !!local.indeterminate;
        setRef(el);
        local.ref?.(el);
      }}
      class="toggle"
      type="checkbox"
      checked={local.value}
      classList={{
        [local.class]: !!local.class,

        'toggle-accent': local.color === 'accent',
        'toggle-primary': local.color === 'primary',
        'toggle-secondary': local.color === 'secondary',

        'toggle-lg': local.size === 'lg',
        'toggle-md': local.size === 'md',
        'toggle-sm': local.size === 'sm',
        'toggle-xs': local.size === 'xs',

        ...local.classList,
      }}
      {...others}
    />
  );
};
