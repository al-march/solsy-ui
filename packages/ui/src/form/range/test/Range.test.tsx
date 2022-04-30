import { render, screen } from 'solid-testing-library';
import { Range, RangeSelectors } from '../Range';

describe('Range', () => {

    test('should be rendered', () => {
        render(() => <Range/>);
        expect(screen.getByTestId(RangeSelectors.INPUT)).toBeInTheDocument();
    });

    test('should set range value', () => {
        const value = 10;
        render(() => <Range value={value}/>);
        expect(screen.getByTestId(RangeSelectors.INPUT)).toHaveValue(value.toString());
    });

    test('should set max range', () => {
        render(() => <Range max={10}/>);
        expect(screen.getByTestId(RangeSelectors.INPUT)).toHaveAttribute('max', '10');
    });

    test('should set min range', () => {
        render(() => <Range min={10}/>);
        expect(screen.getByTestId(RangeSelectors.INPUT)).toHaveAttribute('min', '10');
    });

    test('should set step attribute', () => {
        render(() => <Range step={10}/>);
        expect(screen.getByTestId(RangeSelectors.INPUT)).toHaveAttribute('step', '10');
    });

    test('should render steps', () => {
        const step = 10;
        render(() => <Range step={step}/>);
        expect(screen.getByTestId(RangeSelectors.STEPS)).toBeInTheDocument();
        expect(screen.getAllByTestId(RangeSelectors.STEP).length).toBe(step + 1);
    });
});
