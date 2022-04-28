import { fireEvent, queryByTestId, render } from 'solid-testing-library';
import { Tooltip } from '../Tooltip';

const tooltipMessage = 'Tooltip Message';
const TooltipTest = () => (
    <Tooltip
        message={tooltipMessage}
        placement="right"
    >
        <button class="btn btn-primary">
            Tooltip
        </button>
    </Tooltip>
);

const getTrigger = () => queryByTestId(document.body, 'tooltip-trigger');
const getTooltip = () => queryByTestId(document.body, 'tooltip');

describe('Tooltip', () => {

    test('should show by mouseEnter', () => {
        render(() => <TooltipTest/>);
        const trigger = getTrigger();
        if (trigger) {
            fireEvent.mouseEnter(trigger);
            expect(getTooltip()).toBeInTheDocument();
        } else {
            fail('tooltip trigger not found')
        }
    });

    test('should hide by mouseLeave', () => {
        render(() => <TooltipTest/>);
        const trigger = getTrigger();
        if (trigger) {
            fireEvent.mouseEnter(trigger);
            fireEvent.mouseLeave(trigger);
            expect(getTooltip()).not.toBeInTheDocument();
        } else {
            fail('tooltip trigger not found')
        }
    });

    test('should show current message', () => {
        render(() => <TooltipTest/>);
        const trigger = getTrigger();
        if (trigger) {
            fireEvent.mouseEnter(trigger);
            expect(getTooltip()).toHaveTextContent(tooltipMessage);
        } else {
            fail('tooltip trigger not found')
        }
    });
});
