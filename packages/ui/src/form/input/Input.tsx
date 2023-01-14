import {DaisyColor, DaisySize} from '../../types';
import {JSX, splitProps} from 'solid-js';

export const InputSelectors = {
  INPUT: 'input',
};

export type InputColor = DaisyColor | 'ghost';
export type InputSize = DaisySize;

export type InputProps = {
  color?: InputColor;
  size?: InputSize;
  error?: boolean;
  bordered?: boolean;
} & JSX.InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
  const [local, others] = splitProps(props, [
    'color',
    'size',
    'error',
    'bordered',
    'value',
    'class',
    'classList',
  ]);

  return (
    <input
      data-testid={InputSelectors.INPUT}
      value={props.value || ''}
      class="input"
      classList={{
        [local.class || '']: !!local.class,
        'input-lg': props.size === 'lg',
        'input-md': props.size === 'md',
        'input-sm': props.size === 'sm',
        'input-xs': props.size === 'xs',

        'input-primary': props.color === 'primary',
        'input-secondary': props.color === 'secondary',
        'input-accent': props.color === 'accent',
        'input-info': props.color === 'info',
        'input-success': props.color === 'success',
        'input-warning': props.color === 'warning',
        'input-error': props.color === 'error' || props.error,
        'input-ghost': props.color === 'ghost',

        'input-bordered': props.bordered,
        ...local.classList,
      }}
      {...others}
    />
  );
};
