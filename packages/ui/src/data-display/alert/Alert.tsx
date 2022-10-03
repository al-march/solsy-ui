import {AlertType} from './types';
import {JSXElement, Match, ParentProps, Switch} from 'solid-js';

export const AlertSelectors = {
  ALERT: 'alert',
  DEFAULT_ACTION: 'default-action',
  CUSTOM_ACTION: 'custom-action',
  CLOSE_BTN: 'close-btn',
};

type Props = {
  class?: string;

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
  const DefaultAction = () => (
    <div data-testid={AlertSelectors.DEFAULT_ACTION}>
      <button
        data-testid={AlertSelectors.CLOSE_BTN}
        class="btn btn-sm btn-ghost btn-circle"
        onClick={() => props.onClose?.()}
      >
        <i class="fa-solid fa-xmark" />
      </button>
    </div>
  );

  const Action = () => {
    if (!!props.action && props.action !== true) {
      return (
        <div
          data-testid={AlertSelectors.CUSTOM_ACTION}
          onClick={() => props.onAction?.()}
        >
          {props.action}
        </div>
      );
    } else {
      return <DefaultAction />;
    }
  };

  return (
    <div
      data-testid={AlertSelectors.ALERT}
      class="alert shadow-lg"
      classList={{
        [props.class || '']: !!props.class,
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
