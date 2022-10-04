import {DaisySize, PropChangeEvent, PropInputEvent} from '../../types';
import {createEffect, createSignal} from 'solid-js';

export const ToggleSelectors = {
  INPUT: 'toggle',
};

export type ToggleColor = 'primary' | 'secondary' | 'accent';
export type ToggleSize = DaisySize;

export type ToggleProps = {
  value?: boolean;
  name?: string;
  id?: string;

  onInput?: (v: PropInputEvent<HTMLInputElement>) => void;
  onChange?: (v: PropChangeEvent<HTMLInputElement>) => void;
  ref?: (el: HTMLInputElement) => void;

  color?: ToggleColor;
  size?: ToggleSize;
  disabled?: boolean;
  class?: string;

  indeterminate?: boolean;
};
export const Toggle = (props: ToggleProps) => {
  const [ref, setRef] = createSignal<HTMLInputElement>();

  createEffect(() => {
    const input = ref();
    if (input) {
      input.indeterminate = !!props.indeterminate;
    }
  });

  return (
    <input
      data-testid={ToggleSelectors.INPUT}
      ref={el => {
        el.indeterminate = !!props.indeterminate;
        setRef(el);
        props.ref?.(el);
      }}
      name={props.name}
      id={props.id}
      class="toggle"
      classList={{
        'toggle-accent': props.color === 'accent',
        'toggle-primary': props.color === 'primary',
        'toggle-secondary': props.color === 'secondary',

        'toggle-lg': props.size === 'lg',
        'toggle-md': props.size === 'md',
        'toggle-sm': props.size === 'sm',
        'toggle-xs': props.size === 'xs',

        [props.class || '']: !!props.class,
      }}
      type="checkbox"
      checked={props.value}
      disabled={props.disabled}
      onInput={props.onInput}
      onChange={props.onChange}
    />
  );
};
