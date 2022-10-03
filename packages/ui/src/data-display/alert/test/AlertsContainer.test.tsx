import {AlertSelectors} from '../Alert';
import {AlertsContainer, AlertsCtx, useAlerts} from '../AlertsContainer';
import {AlertTypes} from '../types';
import {classes} from './Alert.test';
import {onMount, ParentProps} from 'solid-js';
import {fireEvent, render, screen} from 'solid-testing-library';

type ContainerApiProps = {
  alertsApi: (ctx: AlertsCtx) => void;
};

const Container = (props: ParentProps) => {
  return <AlertsContainer>{props.children}</AlertsContainer>;
};

const ContainerApi = (p: ParentProps<ContainerApiProps>) => {
  const alerts = useAlerts();
  onMount(() => p.alertsApi(alerts));
  return <></>;
};

const {ALERT, CLOSE_BTN} = AlertSelectors;

const alertRef = () => screen.getByTestId(ALERT);
const alertCloseBtn = () => screen.getByTestId(CLOSE_BTN);

describe('AlertsContainer', () => {
  test('should show specific alert', async () => {
    let ctx: AlertsCtx | undefined;
    render(() => (
      <Container>
        <ContainerApi alertsApi={c => (ctx = c)} />
      </Container>
    ));

    AlertTypes.forEach(type => {
      ctx?.[type](type);
      const alertRef = screen.getByText(type);
      expect(alertRef).toBeInTheDocument();
      expect(alertRef).toHaveClass(classes.colors[type]);
    });
  });
  test('should close by click', async () => {
    let ctx: AlertsCtx | undefined;
    render(() => (
      <Container>
        <ContainerApi alertsApi={c => (ctx = c)} />
      </Container>
    ));

    ctx?.info('alert-info', 4000, true);
    expect(alertRef()).toBeInTheDocument();

    fireEvent.click(alertCloseBtn());
    await Promise.resolve();

    try {
      expect(alertRef());
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
