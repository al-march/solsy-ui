import { Transition } from 'solid-transition-group';
import { Component } from 'solid-js';

type Props = {
    appear?: boolean;
    onExitDone?: () => void;
    onEnterDone?: () => void;
}

export const SlideUpTransition: Component<Props> = (props) => {
    const onEnterDone = () => {
        props.onEnterDone?.();
    };

    const onExitDone = () => {
        props.onExitDone?.();
    };

    return (
        <Transition
            appear={true}
            onBeforeEnter={(el) => ((el as HTMLElement).style.opacity = '0')}
            onEnter={(el, done) => {
                const a = el.animate?.([{
                    opacity: 0,
                    transform: 'scale(0.95) translateY(40px)',
                }, {
                    opacity: 1,
                    transform: 'scale(1) translateY(0)'
                }], {
                    duration: 120,
                    easing: 'cubic-bezier(0.55, 0, 0.55, 0.2)'
                }).finished || Promise.resolve();
                a.then(() => {
                    onEnterDone();
                    done();
                });
            }}
            onAfterEnter={(el) => ((el as HTMLElement).style.opacity = '1')}
            onExit={(el, done) => {
                const a = el.animate?.([{
                    opacity: 1,
                    transform: 'scale(1) translateY(0)',
                }, {
                    opacity: 0,
                    transform: 'scale(0.95) translateY(40px)',
                }], {
                    duration: 120
                }).finished || Promise.resolve();
                a.then(() => {
                    onExitDone();
                    done();
                });
            }}
        >
            {props.children}
        </Transition>
    );
};
