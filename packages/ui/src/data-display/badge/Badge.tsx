import {DaisyColor, DaisySize} from '../../types';
import {ParentProps} from 'solid-js';

export const BadgeSelectors = {
  BADGE: 'badge',
};

export type BadgeColor = DaisyColor | 'ghost';
export type BadgeSize = DaisySize;

export type BadgeProps = {
  color?: BadgeColor;
  size?: BadgeSize;
  outline?: boolean;
};

export const Badge = (props: ParentProps<BadgeProps>) => {
  return (
    <span
      data-testid={BadgeSelectors.BADGE}
      class="badge"
      classList={{
        'badge-lg': props.size === 'lg',
        'badge-md': props.size === 'md',
        'badge-sm': props.size === 'sm',
        'badge-xs': props.size === 'xs',

        'badge-primary': props.color === 'primary',
        'badge-secondary': props.color === 'secondary',
        'badge-accent': props.color === 'accent',
        'badge-info': props.color === 'info',
        'badge-success': props.color === 'success',
        'badge-warning': props.color === 'warning',
        'badge-error': props.color === 'error',
        'badge-ghost': props.color === 'ghost',

        'badge-outline': props.outline,
      }}
    >
      {props.children}
    </span>
  );
};
