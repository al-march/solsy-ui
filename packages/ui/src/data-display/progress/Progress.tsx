import {DaisyColor} from '../../types';
import {Match, mergeProps, ParentProps, Switch} from 'solid-js';

export const ProgressSelectors = {
  PROGRESS: 'progress',
};

export type ProgressProps = {
  value?: number | string;
  max?: number;
  color?: DaisyColor;
  ref?: (ref: HTMLProgressElement) => void;

  class?: string;
  id?: string;
  indeterminate?: boolean;
};

export const ProgressDefaultProps = {
  value: 0,
  max: 100,
  color: 'primary',
  class: '',
};

/* Fixme: cannot set value prop to HTMLProgressElement as undefined */
const ProgressIndeterminate = (props: ProgressProps) => {
  return (
    <progress
      data-testid={ProgressSelectors.PROGRESS}
      id={props.id}
      ref={props.ref}
      class="progress"
      classList={{
        [props.class || '']: !!props.class,

        'progress-primary': props.color === 'primary',
        'progress-secondary': props.color === 'secondary',
        'progress-accent': props.color === 'accent',
        'progress-info': props.color === 'info',
        'progress-success': props.color === 'success',
        'progress-warning': props.color === 'warning',
        'progress-error': props.color === 'error',
      }}
    />
  );
};

export const Progress = (props: ParentProps<ProgressProps>) => {
  const pr = mergeProps({...ProgressDefaultProps}, props);
  return (
    <Switch>
      <Match when={pr.indeterminate} keyed>
        <ProgressIndeterminate {...props} />
      </Match>
      <Match when={!pr.indeterminate} keyed>
        <progress
          data-testid={ProgressSelectors.PROGRESS}
          id={pr.id}
          ref={pr.ref}
          class="progress"
          classList={{
            [pr.class]: !!pr.class,

            'progress-primary': pr.color === 'primary',
            'progress-secondary': pr.color === 'secondary',
            'progress-accent': pr.color === 'accent',
            'progress-info': pr.color === 'info',
            'progress-success': pr.color === 'success',
            'progress-warning': pr.color === 'warning',
            'progress-error': pr.color === 'error',
          }}
          value={pr.value}
          max={pr.max}
        />
      </Match>
    </Switch>
  );
};
