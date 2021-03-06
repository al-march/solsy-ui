import { ParentProps } from 'solid-js';
import { DaisyColor, DaisySize, PropClickEvent, PropFocusEvent } from '../../types';

export const ButtonSelectors = {
  BUTTON: 'button'
};

export type ButtonColor = DaisyColor | 'ghost';
export type ButtonSize = DaisySize;

export type ButtonProps = {
  disabled?: boolean;
  active?: boolean;
  type?: 'button' | 'submit' | 'reset';

  class?: string;

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

  onClick?: (e: PropClickEvent<HTMLButtonElement>) => void;
  onFocus?: (e: PropFocusEvent<HTMLButtonElement>) => void;
  onBlur?: (e: PropFocusEvent<HTMLButtonElement>) => void;
  ref?: (button: HTMLButtonElement) => void;
}

export const Button = (props: ParentProps<ButtonProps>) => {

  return (
    <button
      data-testid={ButtonSelectors.BUTTON}
      ref={props.ref}
      onClick={props.onClick}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      type={props.type || 'button'}

      disabled={props.disabled}
      class={`btn ${props.class || ''}`}
      classList={{
        'btn-lg': props.size === 'lg',
        'btn-md': props.size === 'md',
        'btn-sm': props.size === 'sm',
        'btn-xs': props.size === 'xs',

        'btn-primary': props.color === 'primary',
        'btn-secondary': props.color === 'secondary',
        'btn-accent': props.color === 'accent',
        'btn-info': props.color === 'info',
        'btn-success': props.color === 'success',
        'btn-warning': props.color === 'warning',
        'btn-error': props.color === 'error',
        'btn-ghost': props.color === 'ghost',
        'btn-link': props.link,

        'btn-outline': props.outline,
        'btn-active': props.active,
        'btn-disabled': props.disabled,
        'btn-circle': props.circle,
        'btn-square': props.square,
        'btn-block': props.block,

        'loading': props.loading,
        'glass': props.glass
      }}
    >
      {props.children}
    </button>
  );
};
