import { render, screen } from 'solid-testing-library';
import { ModalAction } from '../ModalAction';

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
