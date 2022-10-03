import {ModalAction} from '../ModalAction';
import {render, screen} from 'solid-testing-library';

describe('ModalAction', () => {
  test('should render content', async () => {
    render(() => (
      <ModalAction>
        <i data-testid="content">Content</i>
      </ModalAction>
    ));

    expect(await screen.findByTestId('content')).toBeInTheDocument();
  });
});
