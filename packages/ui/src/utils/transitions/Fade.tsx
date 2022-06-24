import { ParentProps } from 'solid-js';
import { Transition } from 'solid-transition-group';

type Props = {
  appear?: boolean;
  onExit?: () => void;
  duration?: number;
}

export const Fade = (props: ParentProps<Props>) => {
  const onExitDone = () => {
    props.onExit?.();
  };

  const keyframes = [{
    opacity: 0,
  }, {
    opacity: 1,
  }];

  const options = {
    duration: props.duration || 200,
    easing: 'cubic-bezier(0.55, 0, 0.55, 0.2)'
  };

  return (
    <Transition
      appear={true}
      onBeforeEnter={(el) => (el as HTMLElement).style.opacity = '0'}
      onEnter={async (el, done) => {
        await el.animate?.(keyframes, options).finished;
        done();
      }}
      onAfterEnter={(el) => ((el as HTMLElement).style.opacity = '1')}
      onExit={async (el, done) => {
        await el.animate?.(keyframes.reverse(), options).finished;
        onExitDone();
        done();
      }}
    >
      {props.children}
    </Transition>
  );
};
