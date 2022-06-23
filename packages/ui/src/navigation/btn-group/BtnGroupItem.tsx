import { createSignal, onMount, PropsWithChildren } from 'solid-js';
import { useBtnGroup } from './BtnGroup';
import { Button } from '../../actions';

type Props<T = any> = {
  value?: T;
  disabled?: boolean;
  defaultChecked?: boolean;
  onClick?: (v: T | number) => void;
}

export const BtnGroupItem = <T extends any>(props: PropsWithChildren<Props<T>>) => {

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
    >
      {props.children}
    </Button>
  );
};
