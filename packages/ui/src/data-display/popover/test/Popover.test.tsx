import { fireEvent, render, screen } from 'solid-testing-library';
import { Popover, PopoverSelectors } from '../Popover';

const {TRIGGER, CONTENT} = PopoverSelectors;

describe('Popover', () => {

    test('should be rendered', () => {
        render(() => (
            <Popover show={true} trigger={<button>trigger</button>}>
                <div>content</div>
            </Popover>
        ));

        const trigger = screen.getByTestId(TRIGGER);
        const content = screen.getByTestId(CONTENT);
        expect(trigger).toBeInTheDocument();
        expect(content).toBeInTheDocument();
    });

    test('should open by click on trigger', async () => {
        render(() => (
            <Popover trigger={<button>trigger</button>}>
                <div>content</div>
            </Popover>
        ));

        fireEvent.click(screen.getByTestId(TRIGGER));
        expect(screen.getByTestId(CONTENT)).toBeInTheDocument();
    });

    test('should be closed by backdrop click', async () => {
        render(() => (
            <Popover show trigger={<button>trigger</button>}>
                <div>content</div>
            </Popover>
        ));

        fireEvent.click(document.body);
        await Promise.resolve();
        expect(screen.queryByTestId(CONTENT)).not.toBeInTheDocument();
    });

    test('should emit onClose', async () => {
        const onClose = jest.fn();
        render(() => (
            <Popover show onClose={onClose} trigger={<button>trigger</button>}>
                <div>content</div>
            </Popover>
        ));
        fireEvent.click(document.body);
        expect(onClose).toBeCalled();
    });

    test('should emit onOpen', async () => {
        const onOpen = jest.fn();
        render(() => (
            <Popover onOpen={onOpen} trigger={<button>trigger</button>}>
                <div>content</div>
            </Popover>
        ));

        fireEvent.click(screen.getByTestId(TRIGGER));
        expect(onOpen).toBeCalled();
    });
});
