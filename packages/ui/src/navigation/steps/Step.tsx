import { Component, createEffect, JSXElement } from 'solid-js';
import { useSteps } from './Steps';

type Props = {
    label: JSXElement;
    index: number;
}

export const Step: Component<Props> = (props) => {
    const steps = useSteps();

    const isActive = () => {
        return props.index <= steps?.step();
    };

    const isCurrent = () => {
        console.log(steps?.step());
        return props.index === steps?.step();
    }

    createEffect(() => {
        console.log('effect');
        console.log('isCurrent', isCurrent());
        if (isCurrent()) {
            steps.setStepContent(props.children);
        }
    });

    return (
        <li
            class="step"
            classList={{
                'step-primary': isActive()
            }}
        >
            {props.label}
        </li>
    );
};
