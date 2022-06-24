import { DaisySize } from '../../types';
import { createEffect, createSignal } from 'solid-js';
import { DOMElement } from 'solid-js/types/jsx';

export type ToggleInputEvent = InputEvent & { currentTarget: HTMLInputElement; target: DOMElement }
export type ToggleChangeEvent = Event & { currentTarget: HTMLInputElement; target: DOMElement }

export const ToggleSelectors = {
  INPUT: 'toggle'
};

export type ToggleColor = 'primary' | 'secondary' | 'accent';
export type ToggleSize = DaisySize;

export type ToggleProps = {
  value?: boolean;

  onInput?: (v: ToggleInputEvent) => void;
  onChange?: (v: ToggleChangeEvent) => void;
  ref?: (el: HTMLInputElement) => void;

  color?: ToggleColor;
  size?: ToggleSize;
  class?: string;

  indeterminate?: boolean
}
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
      class={`toggle ${props.class || ''}`}
      classList={{
        'toggle-accent': props.color === 'accent',
        'toggle-primary': props.color === 'primary',
        'toggle-secondary': props.color === 'secondary',

        'toggle-lg': props.size === 'lg',
        'toggle-md': props.size === 'md',
        'toggle-sm': props.size === 'sm',
        'toggle-xs': props.size === 'xs',
      }}
      type="checkbox"
      checked={props.value}

      onInput={props.onInput}
      onChange={props.onChange}
    />
  );
};
