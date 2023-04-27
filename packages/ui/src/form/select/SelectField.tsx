import {SelectColor, SelectSize} from './Select';
import {JSX, mergeProps, splitProps} from 'solid-js';

type Props = {
  size?: SelectSize;
  color?: SelectColor;
  bordered?: boolean;
  error?: boolean;
} & JSX.InputHTMLAttributes<HTMLDivElement>;

export const SelectField = (props: Props) => {
  const pr = mergeProps({class: '', classList: {}}, props);
  const [local, others] = splitProps(pr, [
    'size',
    'color',
    'bordered',
    'error',
    'class',
    'classList',
  ]);

  return (
    <div
      class="select z-10 flex items-center"
      classList={{
        [local.class]: !!local.class,
        'select-lg': local.size === 'lg',
        'select-md': local.size === 'md',
        'select-sm': local.size === 'sm',
        'select-xs': local.size === 'xs',

        'select-primary': local.color === 'primary',
        'select-secondary': local.color === 'secondary',
        'select-accent': local.color === 'accent',
        'select-info': local.color === 'info',
        'select-success': local.color === 'success',
        'select-warning': local.color === 'warning',
        'select-error': local.color === 'error' || local.error,
        'select-ghost': local.color === 'ghost',

        'select-bordered': local.bordered,
        'opacity-40 cursor-not-allowed': others.disabled
      }}
      {...others}
    />
  );
};
