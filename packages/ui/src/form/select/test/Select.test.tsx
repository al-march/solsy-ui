import { cleanup, fireEvent, render, screen } from 'solid-testing-library';
import { Select, SelectColor, SelectSelectors, SelectSize } from '../Select';
import { Option } from '../Option';
import { createSignal, For } from 'solid-js';
import { SelectDropdown } from '../SelectDropdown';
import { ObjectKeys } from '../../../utils/object';


type Classes = {
    main: string,
    colors: Record<SelectColor, string>,
    sizes: Record<SelectSize, string>
}

const addPrefix = (name: string) => `select-${name}`;

const classes: Classes = {
    main: 'select',
    colors: {
        accent: addPrefix('accent'),
        primary: addPrefix('primary'),
        secondary: addPrefix('secondary'),
        info: addPrefix('info'),
        success: addPrefix('success'),
        warning: addPrefix('warning'),
        error: addPrefix('error'),
        ghost: addPrefix('ghost'),
    },
    sizes: {
        lg: addPrefix('lg'),
        md: addPrefix('md'),
        sm: addPrefix('sm'),
        xs: addPrefix('xs'),
    }
};

const {SELECT, DROPDOWN, OPTION_BUTTON, OPTION} = SelectSelectors;

const options = [
    'option 1',
    'option 2',
    'option 3'
];

describe('Select', () => {

    describe('main', () => {
        test('should be rendered', () => {
            render(() => (
                <Select show>
                    <For each={options}>
                        {opt => <Option value={opt}>{opt}</Option>}
                    </For>
                </Select>
            ));
            expect(screen.getByTestId(SELECT)).toBeInTheDocument();
            expect(screen.getByTestId(DROPDOWN)).toBeInTheDocument();
            screen.getAllByTestId(OPTION_BUTTON).forEach((option, i) => {
                expect(option).toBeInTheDocument();
                expect(option).toHaveTextContent(options[i]);
            });
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
            expect(screen.getByTestId(OPTION_BUTTON)).toBeInTheDocument();
        });

        test('should be open by focus', () => {
            render(() => <Select><Option value={0}/></Select>);
            fireEvent.focus(screen.getByTestId(SELECT));
            expect(screen.getByTestId(DROPDOWN)).toBeInTheDocument();
            expect(screen.getByTestId(OPTION_BUTTON)).toBeInTheDocument();
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
            fireEvent.click(screen.getByTestId(OPTION_BUTTON));
            expect(value()).toBe(expectedValue);
        });

        test('should set color classes', () => {
            const {colors} = classes;
            ObjectKeys(colors).forEach(color => {
                render(() => <Select color={color}/>);
                expect(screen.getByTestId(SELECT)).toHaveClass(colors[color]);
                cleanup();
            });
        });

        test('should set size classes', () => {
            const {sizes} = classes;
            ObjectKeys(sizes).forEach(size => {
                render(() => <Select size={size}/>);
                expect(screen.getByTestId(SELECT)).toHaveClass(sizes[size]);
                cleanup();
            });
        });

        test('should set custom classes', () => {
            const className = 'custom-class';
            render(() => <Select class={className}/>);
            expect(screen.getByTestId(SELECT)).toHaveClass(className);
        });
    });

    describe('SelectDropdown', () => {
        test('should be rendered', () => {
            const [ref] = createSignal<HTMLElement | undefined>();
            render(() => <SelectDropdown show reference={ref}/>);
            expect(screen.getByTestId(DROPDOWN)).toBeInTheDocument();
        });

        test('should be closed by backdrop clicked', async () => {
            const [ref] = createSignal<HTMLElement>();
            render(() => <SelectDropdown show reference={ref}/>);
            fireEvent.click(document.body);
            await Promise.resolve();
            expect(screen.queryByTestId(DROPDOWN)).not.toBeInTheDocument();
        });

        test('should be emit onClose', async () => {
            const onClose = jest.fn();
            const [ref] = createSignal<HTMLElement>();
            render(() => <SelectDropdown show reference={ref} onClose={onClose}/>);
            fireEvent.click(document.body);
            await Promise.resolve();
            expect(onClose).toBeCalled();
        });

        test('should open/close by props', () => {
            const [show, setShow] = createSignal(false);
            const [ref] = createSignal<HTMLElement>();
            render(() => <SelectDropdown show={show()} reference={ref}/>);
            expect(screen.queryByTestId(DROPDOWN)).not.toBeInTheDocument();
            setShow(true);
            expect(screen.queryByTestId(DROPDOWN)).toBeInTheDocument();
        });

        test('should focus first option', () => {
            render(() => (
                <Select show>
                    <Option value={0}>Option</Option>
                </Select>
            ));

            expect(screen.getByTestId(OPTION_BUTTON)).toHaveFocus();
        });
    });

    describe('Option', () => {
        test('should be active', () => {
            render(() => (
                <Select show value={0}>
                    <Option value={0}>Option</Option>
                </Select>
            ));
            expect(screen.getByTestId(OPTION_BUTTON)).toHaveClass('active');
        });

        test('should render content', () => {
            const content = 'content';
            render(() => (
                <Select show value={0}>
                    <Option value={0}>{content}</Option>
                </Select>
            ));
            expect(screen.getByTestId(OPTION_BUTTON)).toHaveTextContent(content);
        });

        test('should be disabled', () => {
            render(() => (
                <Select show>
                    <Option disabled value={0}>Option</Option>
                </Select>
            ));

            expect(screen.getByTestId(OPTION)).toHaveClass('disabled');
            expect(screen.getByTestId(OPTION_BUTTON)).toBeDisabled();
        });

        test('should be emit check', () => {
            const onInput = jest.fn();
            render(() => (
                <Select show onInput={onInput}>
                    <Option value={0}>Option</Option>
                </Select>
            ));
            fireEvent.click(screen.getByTestId(OPTION_BUTTON));
            expect(onInput).toBeCalled();
        });

        test('should set current value', () => {
            const [value, setValue] = createSignal();
            render(() => (
                <Select show onInput={setValue}>
                    <For each={options}>
                        {opt => <Option value={opt}>{opt}</Option>}
                    </For>
                </Select>
            ));
            screen.getAllByTestId(OPTION_BUTTON).forEach((option, i) => {
                fireEvent.click(option);
                expect(value()).toBe(options[i]);
            });
        });

        test('should emit onClick', () => {
            const onClick = jest.fn();
            render(() => (
                <Select show>
                    <Option onClick={e => {
                        onClick(e);
                        expect(e instanceof Event).toBeTruthy();
                    }} value={0}>Option</Option>
                </Select>
            ));
            fireEvent.click(screen.getByTestId(OPTION_BUTTON));
            expect(onClick).toBeCalled();
        });

        test('should emit onFocus', () => {
            const onFocus = jest.fn();
            render(() => (
                <Select show>
                    <Option onFocus={e => {
                        onFocus(e);
                        expect(e instanceof Event).toBeTruthy();
                    }} value={0}>Option</Option>
                </Select>
            ));
            fireEvent.focus(screen.getByTestId(OPTION_BUTTON));
            expect(onFocus).toBeCalled();
        });

        test('should emit onBlur', () => {
            const onBlur = jest.fn();
            render(() => (
                <Select show>
                    <Option onBlur={e => {
                        onBlur(e);
                        expect(e instanceof Event).toBeTruthy();
                    }} value={0}>Option</Option>
                </Select>
            ));
            fireEvent.blur(screen.getByTestId(OPTION_BUTTON));
            expect(onBlur).toBeCalled();
        });
    });
});
