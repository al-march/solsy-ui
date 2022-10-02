import {Page} from '@src/views/pages/base/Page';
import {Button} from '@ui/actions';
import {
  Alert,
  AlertsContainer,
  AlertType,
  AlertTypes,
  createAlert,
  useAlerts,
} from '@ui/data-display';
import {For} from 'solid-js';

const capitalize = (word: string) => {
  const [first] = word;
  return first.toUpperCase() + word.slice(1);
};

const AlertsPageContent = () => {
  const alerts = useAlerts();

  function onActionAlert(message: string) {
    console.log('[alert.message]:', message);
  }

  function onCloseAlert(alertId: number) {
    alerts.close(alertId);
  }

  function create(type: AlertType) {
    const message = capitalize(type);
    const timeout = 6000;
    const alert = createAlert(message, type, timeout);

    alert.action = () => (
      <div class="flex gap-2">
        <Button
          onClick={() => onActionAlert(message)}
          size="sm"
          color="primary"
        >
          Log message
        </Button>
        <Button onClick={() => onCloseAlert(alert.id)} size="sm" color="ghost">
          Close
        </Button>
      </div>
    );
    return alert;
  }

  const showAlert = (type: AlertType) => {
    const alert = create(type);
    alerts.show(alert);
  };

  return (
    <Page full class="p-2">
      <h2 class="text-2xl">Avatar</h2>

      <div class="flex flex-col gap-3 py-6">
        <For each={[undefined, ...AlertTypes]}>
          {type => (
            <Alert type={type} action>
              <span>{capitalize(type || 'default')} message!</span>
            </Alert>
          )}
        </For>
      </div>

      <div class="flex flex-row gap-3 py-6">
        <For each={AlertTypes}>
          {type => (
            <Button color="primary" onClick={() => showAlert(type)}>
              <span>{capitalize(type || 'default')}</span>
            </Button>
          )}
        </For>
      </div>
    </Page>
  );
};

export const AlertsPage = () => {
  return (
    <AlertsContainer>
      <AlertsPageContent />
    </AlertsContainer>
  );
};
