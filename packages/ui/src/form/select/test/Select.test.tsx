import { fireEvent, render, screen } from 'solid-testing-library';
import { Select, SelectSelectors } from '../Select';
import { Option } from '../Option';
import { createSignal } from 'solid-js';

// TODO 1. Write tests for dropdown
// TODO 2. Write tests for option
// TODO 3. Write tests for classes

const {SELECT, OPTION, DROPDOWN} = SelectSelectors;

const options = [
    'option 1',
    'option 2',
    'option 3'
];

describe('Select', () => {

    describe('main', () => {
        test('should be rendered', () => {
            render(() => <Select/>);
            expect(screen.getByTestId(SELECT)).toBeInTheDocument();
        });

        test('should set placeholder bty prop', () => {
            const placeholder = 'placeholder';
            render(() => <Select placeholder={placeholder}></Select>);
            expect(screen.getByTestId(SELECT)).toHaveAttribute('placeholder', placeholder);
        });

        test('should open dropdown by click', () => {
            render(() => <Select><Option value={0}/></Select>);
            fireEvent.click(screen.getByTestId(SELECT));
            expect(screen.getByTestId(DROPDOWN)).toBeInTheDocument();
            expect(screen.getByTestId(OPTION)).toBeInTheDocument();
        });

        test('should be open by focus', () => {
            render(() => <Select><Option value={0}/></Select>);
            fireEvent.focus(screen.getByTestId(SELECT));
            expect(screen.getByTestId(DROPDOWN)).toBeInTheDocument();
            expect(screen.getByTestId(OPTION)).toBeInTheDocument();
        });

        test('should be closed by click backdrop', async () => {
            render(() => <Select></Select>);
            fireEvent.click(screen.getByTestId(SELECT));
            expect(screen.getByTestId(DROPDOWN)).toBeInTheDocument();
            fireEvent.click(document.body);
            await Promise.resolve();
            expect(screen.queryByTestId(DROPDOWN)).not.toBeInTheDocument();
        });

        test('should be emit onOpen', () => {
            const onOpen = jest.fn();
            render(() => <Select onOpen={onOpen}></Select>);
            fireEvent.click(screen.getByTestId(SELECT));
            expect(onOpen).toBeCalled();
        });

        test('should be emit onClose', () => {
            const onClose = jest.fn();
            render(() => <Select show onClose={onClose}></Select>);
            fireEvent.click(document.body);
            expect(onClose).toBeCalled();
        });

        test('should be update value by check', () => {
            const expectedValue = 100;
            const [value, setValue] = createSignal();
            render(() => (
                <Select show onInput={setValue}>
                    <Option value={expectedValue}/>
                </Select>
            ));
            fireEvent.click(screen.getByTestId(OPTION));
            expect(value()).toBe(expectedValue);
        });
    });
});
