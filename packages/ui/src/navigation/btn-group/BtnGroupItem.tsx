import {Button} from '../../actions';
import {BtnGroupColor, useBtnGroup} from './BtnGroup';
import {createSignal, onMount, ParentProps} from 'solid-js';

type Props<T = any> = {
  value?: T;
  color?: BtnGroupColor;
  disabled?: boolean;
  defaultChecked?: boolean;
  onClick?: (v: T | number) => void;
  class?: string;
};

export const BtnGroupItem = <T extends any>(props: ParentProps<Props<T>>) => {
  const ctx = useBtnGroup();
  const [value, setValue] = createSignal<T | number>(props.value || 0);

  onMount(() => {
    if (props.defaultChecked) {
      ctx.setActive(value());
    }
  });

  function isActive() {
    return ctx.state.activeButtons.has(value());
  }

  function initButton(el: HTMLElement) {
    if (value()) {
      return;
    }

    const index = ctx.initButton(el);
    if (!value()) {
      setValue(index);
    }
  }

  function onClick() {
    const v = value();
    ctx.setActive(v);
    props.onClick?.(v);
  }

  return (
    <Button
      ref={initButton}
      active={isActive()}
      onClick={onClick}
      size={ctx.state.size}
      color={props.color || ctx.state.color}
      class={props.class}
    >
      {props.children}
    </Button>
  );
};
