import {MenuSelectors, useMenu} from './Menu';
import {createEffect, createSignal, on, ParentProps} from 'solid-js';

export const MenuTrigger = (props: ParentProps) => {
  const [ref, setRef] = createSignal<HTMLElement>();
  const ctx = useMenu();

  createEffect(
    on(ref, trigger => {
      if (trigger) {
        setRef(trigger);
        ctx.initTrigger(trigger);
      }
    })
  );

  return (
    <div data-testid={MenuSelectors.TRIGGER} ref={setRef} onClick={ctx.toggle}>
      {props.children}
    </div>
  );
};
