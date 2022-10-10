import {ParentProps} from 'solid-js';
import {Transition} from 'solid-transition-group';

export const DropdownAnimation = (
  props: ParentProps<{onExit?: () => void; onEnter?: () => void}>
) => {
  return (
    <Transition
      appear
      onBeforeEnter={el => ((el as HTMLElement).style.opacity = '0')}
      onAfterEnter={el => ((el as HTMLElement).style.opacity = '1')}
      onEnter={async (el, done) => {
        await el.animate?.(
          [
            {
              opacity: 0,
              transform: 'translateY(-40px)',
            },
            {
              opacity: 1,
              transform: 'translateY(0)',
            },
          ],
          {
            duration: 160,
            easing: 'cubic-bezier(0, 0, 0.2, 1)',
          }
        ).finished;
        props.onEnter?.();
        done();
      }}
      onExit={async (el, done) => {
        await el.animate?.(
          [
            {
              opacity: 1,
            },
            {
              opacity: 0,
            },
          ],
          {
            duration: 220,
            easing: 'cubic-bezier(0, 0, 0.2, 1)',
          }
        ).finished;
        props.onExit?.();
        done();
      }}
    >
      {props.children}
    </Transition>
  );
};
