import {ParentProps} from 'solid-js';
import {Transition} from 'solid-transition-group';

type Props = {
  appear?: boolean;
  onExit?: () => void;
};

export const ScaleTransition = (props: ParentProps<Props>) => {
  const onExitDone = () => {
    props.onExit?.();
  };

  return (
    <Transition
      appear={true}
      onBeforeEnter={el => ((el as HTMLElement).style.opacity = '0')}
      onEnter={async (el, done) => {
        await el.animate?.(
          [
            {
              opacity: 0,
              transform: 'scale(0.8) translateX(-5px) translateY(20px)',
            },
            {
              opacity: 1,
              transform: 'scale(1) translateX(0) translateY(0)',
            },
          ],
          {
            duration: 160,
            easing: 'cubic-bezier(0.55, 0, 0.55, 0.2)',
          }
        ).finished;
        done();
      }}
      onAfterEnter={el => ((el as HTMLElement).style.opacity = '1')}
      onExit={async (el, done) => {
        await el.animate?.(
          [
            {
              opacity: 1,
              transform: 'scale(1)',
            },
            {
              opacity: 0,
              transform: 'scale(0.90)',
            },
          ],
          {
            duration: 120,
            easing: 'cubic-bezier(0.55, 0, 0.55, 0.2)',
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
