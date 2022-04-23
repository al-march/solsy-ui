import { Transition } from 'solid-transition-group';
import { Component } from 'solid-js';

const onEnter = (el: Element) => {
    return el.animate([{
        opacity: 0,
        transform: 'scale(0.95) translateY(100%)',
    }, {
        opacity: 1,
        transform: 'scale(1) translateY(0)'
    }], {
        duration: 120,
        easing: 'cubic-bezier(0.55, 0, 0.55, 0.2)'
    });
};

const onExit = (el: Element) => {
    return el.animate([{
        opacity: 1,
        transform: 'scale(1) translateY(0)',
    }, {
        opacity: 0,
        transform: 'scale(0.95) translateY(100%)',
    }], {
        duration: 120
    });
};

type Props = {
    appear?: boolean;
    onExit?: () => void;
}

export const SlideUpTransition: Component<Props> = (props) => {
    const onExitDone = () => {
        if (props.onExit) {
            props.onExit();
        }
    };

    return (
        <Transition
            appear={!!props.appear}
            onEnter={onEnter}
            onExit={(el) => onExit(el).finished.then(onExitDone)}
        >
            {props.children}
        </Transition>
    );
}