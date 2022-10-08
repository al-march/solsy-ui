import {DaisyColor, DaisySize} from '../../types';
import {mergeProps, ParentProps} from 'solid-js';

export const BadgeSelectors = {
  BADGE: 'badge',
};

export type BadgeColor = DaisyColor | 'ghost';
export type BadgeSize = DaisySize;

export type BadgeProps = {
  color?: BadgeColor;
  size?: BadgeSize;
  class?: string;
  id?: string;
  outline?: boolean;
};

export const Badge = (props: ParentProps<BadgeProps>) => {
  const pr = mergeProps({class: ''}, props);
  return (
    <span
      data-testid={BadgeSelectors.BADGE}
      class="badge"
      id={pr.id}
      classList={{
        [pr.class]: !!pr.class,
        'badge-lg': pr.size === 'lg',
        'badge-md': pr.size === 'md',
        'badge-sm': pr.size === 'sm',
        'badge-xs': pr.size === 'xs',

        'badge-primary': pr.color === 'primary',
        'badge-secondary': pr.color === 'secondary',
        'badge-accent': pr.color === 'accent',
        'badge-info': pr.color === 'info',
        'badge-success': pr.color === 'success',
        'badge-warning': pr.color === 'warning',
        'badge-error': pr.color === 'error',
        'badge-ghost': pr.color === 'ghost',

        'badge-outline': pr.outline,
      }}
    >
      {props.children}
    </span>
  );
};
