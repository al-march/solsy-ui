import { DaisyColor, DaisySize } from '../../types';
import { Component, createMemo, JSX, splitProps } from 'solid-js';

export const ButtonSelectors = {
  BUTTON: 'button',
};

export type ButtonColor = DaisyColor | 'ghost';
export type ButtonSize = DaisySize;

export type ButtonProps = {
  disabled?: boolean;
  active?: boolean;
  color?: ButtonColor;
  size?: ButtonSize;
  link?: boolean;
  outline?: boolean;
  glass?: boolean;
  noAnimation?: boolean;
  loading?: boolean;
  wide?: boolean;
  block?: boolean;
  circle?: boolean;
  square?: boolean;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: Component<ButtonProps> = (props) => {
  const [local, others] = splitProps(props, [
    'disabled',
    'active',
    'type',
    'color',
    'size',
    'link',
    'outline',
    'glass',
    'noAnimation',
    'loading',
    'wide',
    'block',
    'circle',
    'square',
    'children',
    'class',
    'classList',
  ]);

  const activeClass = createMemo(() =>
    local.color === 'primary' ? 'btn-accent' : 'btn-active'
  );

  return (
    <button
      data-testid={ButtonSelectors.BUTTON}
      type={local.type || 'button'}
      disabled={local.disabled}
      class="btn"
      classList={{
        [local.class || '']: !!local.class,
        'btn-lg': local.size === 'lg',
        'btn-md': local.size === 'md',
        'btn-sm': local.size === 'sm',
        'btn-xs': local.size === 'xs',

        'btn-outline': local.outline,
        'btn-disabled': local.disabled,
        'btn-circle': local.circle,
        'btn-square': local.square,
        'btn-block': local.block,
        'btn-wide': local.wide,

        'btn-primary': local.color === 'primary',
        'btn-secondary': local.color === 'secondary',
        'btn-accent': local.color === 'accent',
        'btn-info': local.color === 'info',
        'btn-success': local.color === 'success',
        'btn-warning': local.color === 'warning',
        'btn-error': local.color === 'error',
        'btn-ghost': local.color === 'ghost',
        'btn-link': local.link,

        'loading': local.loading,
        'glass': local.glass,
        'no-animation': local.noAnimation,

        [activeClass()]: local.active,
        ...local.classList,
      }}
      {...others}
    >
      {local.children}
    </button>
  );
};
