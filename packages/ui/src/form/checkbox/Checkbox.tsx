import {DaisySize} from '../../types';
import {
  createEffect,
  createSignal,
  JSX,
  mergeProps,
  splitProps,
} from 'solid-js';

export const CheckboxSelectors = {
  CHECKBOX: 'checkbox',
};

export type CheckboxColor = 'primary' | 'secondary' | 'accent';
export type CheckboxSize = DaisySize;

type InputProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'value'>;

export type CheckboxProps = {
  value?: boolean;
  ref?: (el: HTMLInputElement) => void;
  size?: CheckboxSize;
  color?: CheckboxColor;
  indeterminate?: boolean;
} & InputProps;

export const Checkbox = (props: CheckboxProps) => {
  const merge = mergeProps({class: '', classList: {}}, props);
  const [local, others] = splitProps(merge, [
    'type',
    'value',
    'ref',
    'size',
    'color',
    'indeterminate',
    'class',
    'classList',
  ]);

  const [ref, setRef] = createSignal<HTMLInputElement>();

  createEffect(() => {
    const input = ref();
    if (input) {
      input.indeterminate = !!local.indeterminate;
    }
  });

  return (
    <input
      data-testid={CheckboxSelectors.CHECKBOX}
      type="checkbox"
      class="checkbox"
      checked={!!local.value}
      ref={el => {
        el.indeterminate = !!local.indeterminate;
        setRef(el);
        local.ref?.(el);
      }}
      classList={{
        [local.class]: !!local.class,
        'checkbox-accent': local.color === 'accent',
        'checkbox-primary': local.color === 'primary',
        'checkbox-secondary': local.color === 'secondary',

        'checkbox-lg': local.size === 'lg',
        'checkbox-md': local.size === 'md',
        'checkbox-sm': local.size === 'sm',
        'checkbox-xs': local.size === 'xs',

        ...local.classList,
      }}
      {...others}
    />
  );
};
