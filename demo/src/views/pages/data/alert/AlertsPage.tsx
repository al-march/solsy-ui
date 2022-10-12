import {Code, ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
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

  function onCloseAction(message: string, alertId: number) {
    console.log('[alert.message]:', message);
    alerts.close(alertId);
  }

  function create(type?: AlertType) {
    const message = capitalize(type || 'default');
    const alert = createAlert(message, type);

    alert.action = () => (
      <div class="flex gap-2">
        <Button
          onClick={() => onCloseAction(message, alert.id)}
          size="sm"
          color="ghost"
        >
          x
        </Button>
      </div>
    );
    return alert;
  }

  function showAlert(type?: AlertType) {
    const alert = create(type);
    alerts.show(alert);
  }

  return (
    <Page full class="p-4">
      <h2 class="text-2xl">Avatar</h2>

      <Page.Section name="import">
        <br />
        <ImportPreview component="Alert"></ImportPreview>
      </Page.Section>

      <Page.Section name="default usage">
        <h2 class="text-2xl">Default usage</h2>
        <div class="flex flex-col gap-3 py-6">
          <For each={[undefined, ...AlertTypes]}>
            {type => (
              <Alert type={type} action>
                <span>{capitalize(type || 'default')} message!</span>
              </Alert>
            )}
          </For>
        </div>

        <Code>{`
          <Alert type="info" action>Info message!</Alert>
          <Alert type="success" action>Success message!</Alert>
          <Alert type="warning" action>Warning message!</Alert>
          <Alert type="error" action>Error message!</Alert>
        `}</Code>
      </Page.Section>

      <Page.Section name="Alerts container">
        <h2 class="text-2xl">Alerts container</h2>

        <div class="py-6">
          <Button color="primary" onClick={() => showAlert('info')}>
            Info
          </Button>
        </div>

        <Code>{`
          <AlertsContainer>
            <App />
          </AlertsContainer>
        `}</Code>

        <Code>{`
          const alerts = useAlerts();
          
          function onCloseAction(message: string, alertId: number) {
            console.log('[alert.message]:', message);
            alerts.close(alertId);
          }
          
          function create(type?: AlertType) {
            const message = capitalize(type || 'default');
            const alert = createAlert(message, type);
          
            alert.action = () => (
              <div class="flex gap-2">
                <Button
                  onClick={() => onCloseAction(message, alert.id)}
                  size="sm"
                  color="ghost"
                >
                  x
                </Button>
              </div>
            );
            return alert;
          }
          
          function showAlert(type?: AlertType) {
            const alert = create(type);
            alerts.show(alert);
          }
          
          return (
            <Button color="primary" onClick={() => showAlert('info')}>
              Info
            </Button>
          )
        `}</Code>
      </Page.Section>
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
