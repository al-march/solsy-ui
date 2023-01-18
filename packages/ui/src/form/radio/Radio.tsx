import {DaisySize} from '../../types';
import {JSX, splitProps} from 'solid-js';

export const RadioSelector = {
  RADIO: 'radio',
};

export type RadioColor = 'primary' | 'secondary' | 'accent';
export type RadioSize = DaisySize;

type InputProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'value'>;

export type RadioProps = {
  value?: boolean;
  size?: RadioSize;
  color?: RadioColor;
} & InputProps;

export const Radio = (props: RadioProps) => {
  const [local, others] = splitProps(props, [
    'value',
    'size',
    'color',
    'class',
    'classList',
  ]);

  return (
    <input
      data-testid={RadioSelector.RADIO}
      type="radio"
      checked={local.value}
      class="radio"
      classList={{
        [local.class || '']: !!local.class,
        'radio-accent': local.color === 'accent',
        'radio-primary': local.color === 'primary',
        'radio-secondary': local.color === 'secondary',

        'radio-lg': local.size === 'lg',
        'radio-md': local.size === 'md',
        'radio-sm': local.size === 'sm',
        'radio-xs': local.size === 'xs',

        ...local.classList,
      }}
      {...others}
    />
  );
};
