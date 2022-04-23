import { Component } from 'solid-js';
import { Transition } from 'solid-transition-group';

const onEnter = (el: Element) => {
    return el.animate([{
        opacity: 0,
        transform: 'scale(0.8) translateX(-5px) translateY(20px)',
    }, {
        opacity: 1,
        transform: 'scale(1) translateX(0) translateY(0)'
    }], {
        duration: 160,
        easing: 'cubic-bezier(0.55, 0, 0.55, 0.2)'
    });
};

const onExit = (el: Element) => {
    return el.animate([{
        opacity: 1,
        transform: 'scale(1)'
    }, {
        opacity: 0,
        transform: 'scale(0.90)'
    }], {
        duration: 120,
        easing: 'cubic-bezier(0.55, 0, 0.55, 0.2)'
    });
};

type Props = {
    appear?: boolean;
    onExit?: () => void;
}

export const ScaleTransition: Component<Props> = (props) => {

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
};