import {AlertType} from './types';
import {JSXElement, Match, ParentProps, Switch} from 'solid-js';

type Props = {
  type?: AlertType;
  action?: JSXElement | null;
  onAction?: () => void;
  onClose?: () => void;
};

/**
 * Alert - a component for displaying notices
 *
 * @example
 * <Alert
 *     type={alertType()}
 *     action={
 *         <Button onClick={toggleAlert}>Ok</Button>
 *     }
 * >
 *     <div>We use cookies for no reason!</div>
 * </Alert>
 */
export const Alert = (props: ParentProps<Props>) => {
  const defaultAction = () => (
    <button
      class="btn btn-sm btn-ghost btn-circle"
      onClick={() => props.onClose?.()}
    >
      <i class="fa-solid fa-xmark" />
    </button>
  );

  const Action = () => {
    if (props.action instanceof Function) {
      return <div onClick={() => props.onAction?.()}>{props.action}</div>;
    } else {
      return defaultAction();
    }
  };

  return (
    <div
      class="alert shadow-lg"
      classList={{
        'alert-info': props.type === 'info',
        'alert-success': props.type === 'success',
        'alert-warning': props.type === 'warning',
        'alert-error': props.type === 'error',
      }}
    >
      {props.children}

      <div class="flex-none">
        <Switch>
          <Match when={props.action} keyed>
            <Action />
          </Match>
          <Match when={!props.action} keyed>
            {null}
          </Match>
        </Switch>
      </div>
    </div>
  );
};
