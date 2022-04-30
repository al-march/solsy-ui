import { cleanup, render, screen } from 'solid-testing-library';
import { Range, RangeColor, RangeSelectors, RangeSize } from '../Range';

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

    test('should set color classes', () => {
        const colors: Record<RangeColor, string> = {
            primary: 'range-primary',
            secondary: 'range-secondary',
            accent: 'range-accent'
        };

        Object.keys(colors).forEach(key => {
            const color = key as RangeColor;
            render(() => <Range color={color}/>);
            expect(screen.getByTestId(RangeSelectors.INPUT)).toHaveClass(colors[color]);
            cleanup();
        });
    });

    test('should set size classes', () => {
        const sizes: Record<RangeSize, string> = {
            lg: 'range-lg',
            md: 'range-md',
            sm: 'range-sm',
            xs: 'range-xs'
        };

        Object.keys(sizes).forEach((key) => {
            const size = key as RangeSize;
            render(() => <Range size={size}/>);
            expect(screen.getByTestId(RangeSelectors.INPUT)).toHaveClass(sizes[size]);
            cleanup();
        });
    });
});
