import {ParentProps} from 'solid-js';
import {TransitionGroup} from 'solid-transition-group';

export const AlertTransition = (props: ParentProps) => {
  return (
    <TransitionGroup
      onBeforeEnter={el => ((el as HTMLElement).style.opacity = '0')}
      onAfterEnter={el => ((el as HTMLElement).style.opacity = '1')}
      onEnter={async (el, done) => {
        await el.animate?.(
          [
            {
              opacity: 0,
              height: 0,
            },
            {
              opacity: 1,
              height: el.scrollHeight + 'px',
            },
          ],
          {
            duration: 160,
            easing: 'cubic-bezier(0.55, 0, 0.55, 0.2)',
          }
        ).finished;
        done();
      }}
      onExit={async (el, done) => {
        await el.animate?.(
          [
            {
              height: el.scrollHeight + 'px',
            },
            {
              height: 0,
            },
          ],
          {
            duration: 120,
            easing: 'cubic-bezier(0.55, 0, 0.55, 0.2)',
          }
        ).finished;
        done();
      }}
    >
      {props.children}
    </TransitionGroup>
  );
};
