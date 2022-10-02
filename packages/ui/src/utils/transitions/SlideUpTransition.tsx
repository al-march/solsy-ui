import {ParentProps} from 'solid-js';
import {Transition} from 'solid-transition-group';

type Props = {
  appear?: boolean;
  onExitDone?: () => void;
  onEnterDone?: () => void;
};

export const SlideUpTransition = (props: ParentProps<Props>) => {
  const onEnterDone = () => {
    props.onEnterDone?.();
  };

  const onExitDone = () => {
    props.onExitDone?.();
  };

  return (
    <Transition
      appear={props.appear}
      onBeforeEnter={el => ((el as HTMLElement).style.opacity = '0')}
      onEnter={async (el, done) => {
        await el.animate?.(
          [
            {
              opacity: 0,
              transform: 'translateY(40px)',
            },
            {
              opacity: 1,
              transform: 'translateY(0)',
            },
          ],
          {
            duration: 120,
            easing: 'cubic-bezier(0.55, 0, 0.55, 0.2)',
          }
        ).finished;
        onEnterDone();
        done();
      }}
      onAfterEnter={el => ((el as HTMLElement).style.opacity = '1')}
      onExit={async (el, done) => {
        await el.animate?.(
          [
            {
              opacity: 1,
              transform: 'translateY(0)',
            },
            {
              opacity: 0,
              transform: 'translateY(40px)',
            },
          ],
          {
            duration: 120,
          }
        ).finished;
        onExitDone();
        done();
      }}
    >
      {props.children}
    </Transition>
  );
};
