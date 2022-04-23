import { Component } from 'solid-js';
import { DaisyColor } from '../../types';

type Props = {
    value: number;
    max?: number;
    color?: DaisyColor;
}

export const Progress: Component<Props> = (props) => {
    return (
        <progress
            class="progress"
            classList={{
                'progress-primary': props.color === 'primary',
                'progress-secondary': props.color === 'secondary',
                'progress-accent': props.color === 'accent',
                'progress-info': props.color === 'info',
                'progress-success': props.color === 'success',
                'progress-warning': props.color === 'warning',
                'progress-error': props.color === 'error',
            }}
            value={props.value || 0}
            max={props.max || 100}
        />
    );
};
