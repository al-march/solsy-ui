import { ParentProps } from 'solid-js';
import { DaisyColor, DaisySize } from '../../types';

export const BadgeSelectors = {
  BADGE: 'badge'
};

export type BadgeColor = DaisyColor | 'ghost';
export type BadgeSize = DaisySize;

export type BadgeProps = {
  color?: BadgeColor;
  size?: BadgeSize;
  outline?: boolean;
  class?: string;
}

export const Badge = (props: ParentProps<BadgeProps>) => {
  return (
    <span
      data-testid={BadgeSelectors.BADGE}
      class="badge"

      classList={{        
        'badge-lg': props.size === 'lg',
        'badge-md': props.size === 'md',
        'badge-sm': props.size === 'sm',
        'badge-xs py-1.5 text-xxs': props.size === 'xs',
        
        'badge-primary': props.color === 'primary',
        'badge-secondary': props.color === 'secondary',
        'badge-accent': props.color === 'accent',
        'badge-info': props.color === 'info',
        'badge-success': props.color === 'success',
        'badge-warning': props.color === 'warning',
        'badge-error': props.color === 'error',
        'badge-ghost': props.color === 'ghost',
        
        'badge-outline': props.outline,
        
        [props.class || '']: !!props.class,
      }}
    >
      {props.children}
    </span>
  );
};
