import {Alert} from './Alert';
import {AlertType} from './types';
import {AlertTransition} from './utils/AlertTransition';
import {
  createContext,
  createMemo,
  For,
  JSXElement,
  ParentProps,
  useContext,
} from 'solid-js';
import {createStore} from 'solid-js/store';
import {Portal} from 'solid-js/web';

let alertId = 0;

class AlertsStackItem {
  constructor(
    public id: number,
    public message: string,
    public type?: AlertType,
    public timeout = 3000,
    public action?: JSXElement
  ) {}
}

export type AlertsStack = Map<number, AlertsStackItem>;

type AlertsState = {
  alerts: AlertsStack;
};

type AlertsCtx = {
  state: AlertsState;

  show: (alert: AlertsStackItem) => void;
  info: (message: string, timeout?: number, action?: JSXElement) => void;
  success: (message: string, timeout?: number, action?: JSXElement) => void;
  warning: (message: string, timeout?: number, action?: JSXElement) => void;
  error: (message: string, timeout?: number, action?: JSXElement) => void;

  close: (alertId: number) => void;
};

const AlertsCtx = createContext<AlertsCtx>();

export const useAlerts = () => {
  const ctx = useContext(AlertsCtx);
  if (ctx) {
    return ctx;
  }
  throw new Error('No context for Alerts');
};

export function createAlert(
  msg: string,
  type: AlertType,
  timeout = 3000,
  action?: JSXElement
) {
  return new AlertsStackItem(alertId++, msg, type, timeout, action);
}

export const AlertsContainer = (props: ParentProps) => {
  const [state, setState] = createStore<AlertsState>({
    alerts: new Map(),
  });

  const stack = createMemo(() => Array.from(state.alerts.values()).reverse());

  function show(alert: AlertsStackItem) {
    addAlert(alert);
  }

  function info(message: string, timeout = 3000, action?: JSXElement) {
    addAlert(createAlert(message, 'info', timeout, action));
  }

  function success(message: string, timeout = 3000, action?: JSXElement) {
    addAlert(createAlert(message, 'success', timeout, action));
  }

  function warning(message: string, timeout = 3000, action?: JSXElement) {
    addAlert(createAlert(message, 'warning', timeout, action));
  }

  function error(message: string, timeout = 3000, action?: JSXElement) {
    addAlert(createAlert(message, 'error', timeout, action));
  }

  function addAlert(alert: AlertsStackItem) {
    const alerts = new Map(state.alerts.set(alert.id, alert));
    setState('alerts', alerts);
    setAlertTimeout(alert.id, alert.timeout);
  }

  function close(alertId: number) {
    const stack = new Map(state.alerts);
    stack.delete(alertId);
    setState('alerts', new Map(stack));
  }

  function setAlertTimeout(alertId: number, timeout: number) {
    setTimeout(() => {
      close(alertId);
    }, timeout);
  }

  return (
    <AlertsCtx.Provider
      value={{
        state,
        show,
        info,
        success,
        warning,
        error,
        close,
      }}
    >
      {props.children}

      <Portal>
        <div class="container fixed bottom-2 left-0 right-0 flex flex-col gap-2">
          <AlertTransition>
            <For each={stack()}>
              {alert => (
                <div class="overflow-hidden">
                  <Alert
                    type={alert.type}
                    action={alert.action}
                    onClose={() => close(alert.id)}
                  >
                    {alert.message}
                  </Alert>
                </div>
              )}
            </For>
          </AlertTransition>
        </div>
      </Portal>
    </AlertsCtx.Provider>
  );
};
