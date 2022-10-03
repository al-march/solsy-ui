import {Button} from '../../actions';
import {useBtnGroup} from './BtnGroup';
import {createSignal, onMount, ParentProps} from 'solid-js';

type Props<T = any> = {
  value?: T;
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
    const index = ctx.initButton(el);
    const v = value();
    if (!v) {
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
      class={props.class}
    >
      {props.children}
    </Button>
  );
};
