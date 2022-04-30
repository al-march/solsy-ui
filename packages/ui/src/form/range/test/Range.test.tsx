import { cleanup, fireEvent, render, screen } from 'solid-testing-library';
import { Range, RangeColor, RangeSelectors, RangeSize } from '../Range';
import { ObjectKeys } from '../../../utils/object';

type RangeClasses = {
    main: string,
    colors: Record<RangeColor, string>,
    sizes: Record<RangeSize, string>
}

const addPrefix = (name: string) => `range-${name}`;

const classes: RangeClasses = {
    main: 'range',
    colors: {
        accent: addPrefix('accent'),
        primary: addPrefix('primary'),
        secondary: addPrefix('secondary'),
    },
    sizes: {
        lg: addPrefix('lg'),
        md: addPrefix('md'),
        sm: addPrefix('sm'),
        xs: addPrefix('xs'),
    }
};

describe('Range', () => {

    test('should be rendered', () => {
        render(() => <Range/>);
        expect(screen.getByTestId(RangeSelectors.INPUT)).toBeInTheDocument();
    });

    test('should set value', () => {
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

    test('should onInput emit', () => {
        const stub = jest.fn();
        render(() => <Range onInput={stub} step={10}/>);
        fireEvent.input(screen.getByTestId(RangeSelectors.INPUT));
        expect(stub).toBeCalled();
    });

    test('should set color classes', () => {
        const {colors} = classes;
        ObjectKeys(colors).forEach((color) => {
            render(() => <Range color={color}/>);
            expect(screen.getByTestId(RangeSelectors.INPUT)).toHaveClass(colors[color]);
            cleanup();
        });
    });

    test('should set size classes', () => {
        const {sizes} = classes;
        ObjectKeys(sizes).forEach((size) => {
            render(() => <Range size={size}/>);
            expect(screen.getByTestId(RangeSelectors.INPUT)).toHaveClass(sizes[size]);
            cleanup();
        });
    });
});
