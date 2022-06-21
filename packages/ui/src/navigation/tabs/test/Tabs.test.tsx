import { Component, For } from 'solid-js';
import { cleanup, fireEvent, render, screen } from 'solid-testing-library';
import { Tabs, TabSelectors, TabSize, TabsProps, TabView } from '../Tabs';
import { Tab } from '../Tab';
import { ObjectKeys } from '../../../utils/object';

jest.mock('solid-transition-group', () => {
  const FakeTransition = jest.fn(({children}) => children)
  const FakeCSSTransition = jest.fn(props =>
    <FakeTransition>{props.children}</FakeTransition>
  )
  return {CSSTransition: FakeCSSTransition, Transition: FakeTransition}
})

const {TAB, TAB_GROUP} = TabSelectors;

type ToggleClasses = {
    main: string,
    sizes: Record<TabSize, string>;
    boxed: string;
    bordered: string;
    lifted: string;
}

const addPrefix = (name: string) => `tab-${name}`;

const classes: ToggleClasses = {
    main: 'toggle',
    sizes: {
        lg: addPrefix('lg'),
        md: addPrefix('md'),
        sm: addPrefix('sm'),
        xs: addPrefix('xs'),
    },
    boxed: 'tabs-boxed',
    bordered: addPrefix('bordered'),
    lifted: addPrefix('lifted'),
};

const tabs = [{
    label: 'Tab label 1',
    content: 'Tab content 1'
}, {
    label: 'Tab label 2',
    content: 'Tab content 2'
}];

const TabsTest: Component<TabsProps> = (props) => {
    return (
        <Tabs {...props}>
            <For each={tabs}>
                {tab => <Tab label={tab.label}>{tab.content}</Tab>}
            </For>
        </Tabs>
    );
};

const isActive = (tab: HTMLElement) => tab.classList.contains('tab-active');

describe('Tabs', () => {
    test('should be rendered', async () => {
        render(() => <TabsTest/>);
        const [first, second] = tabs;
        expect(await screen.findByText(first.label)).toBeInTheDocument();
        expect(await screen.findByText(second.label)).toBeInTheDocument();
    });
    test('should render first tab without value prop', async () => {
        render(() => <TabsTest/>);
        const [tab] = tabs;
        expect(await screen.findByText(tab.content)).toBeInTheDocument();
    });
    test('should render tab by defaultValue', async () => {
        const value = 1;
        render(() => <TabsTest value={value}/>);
        expect(await screen.findByText(tabs[value].content)).toBeInTheDocument();
    });
    test('should set tab active by prop', async () => {
        render(() => <TabsTest value={0}/>);
        expect(isActive(screen.getAllByTestId(TAB)[0])).toBeTruthy();
        cleanup();
        render(() => <TabsTest value={1}/>);
        expect(isActive(screen.getAllByTestId(TAB)[1])).toBeTruthy();
    });
    test('should emit onInput', () => {
        const onInput = jest.fn();
        render(() => <TabsTest onInput={onInput}/>);
        const [tab] = screen.getAllByTestId(TAB);
        fireEvent.click(tab);
        expect(onInput).toBeCalled();
    });
    test('should update value by changes', () => {
        let value = -1;
        render(() => <TabsTest onInput={v => value = v}/>);
        const [first, second] = screen.getAllByTestId(TAB);
        fireEvent.click(first);
        expect(value).toBe(0);
        fireEvent.click(second);
        expect(value).toBe(1);
    });
    test('should update tab content by click', async () => {
        render(() => <TabsTest animation={false}/>);
        const [first, second] = screen.getAllByTestId(TAB);
        fireEvent.click(second);
        expect(await screen.findByText(tabs[1].content));
        fireEvent.click(first);
        expect(await screen.findByText(tabs[0].content));
    });
    test('should set size class', () => {
        const {sizes} = classes;
        ObjectKeys(sizes).forEach(size => {
            render(() => <TabsTest size={size}/>);
            screen.getAllByTestId(TAB).forEach(tab => {
                expect(tab).toHaveClass(sizes[size]);
            });
            cleanup();
        });
    });
    test('should tab emit onFocus event', () => {
        const onFocus = jest.fn();
        render(() => (
            <Tabs>
                <Tab label={''} onFocus={onFocus}/>
            </Tabs>
        ));
        fireEvent.focus(screen.getByTestId(TAB));
        expect(onFocus).toBeCalled();
    });
    test('should tab emit onBlur event', () => {
        const onBlur = jest.fn();
        render(() => (
            <Tabs>
                <Tab label={''} onBlur={onBlur}/>
            </Tabs>
        ));
        fireEvent.blur(screen.getByTestId(TAB));
        expect(onBlur).toBeCalled();
    });
    test('should set view class', () => {
        const viewsClassMap: Record<TabView, string> = {
            boxed: classes.boxed,
            bordered: classes.bordered,
            lifted: classes.lifted,
        };

        ObjectKeys(viewsClassMap).forEach(view => {
            render(() => <TabsTest view={view}/>);

            if (view === 'boxed') {
                expect(screen.getByTestId(TAB_GROUP)).toHaveClass(viewsClassMap[view]);
            } else {
                screen.getAllByTestId(TAB).forEach(tab => {
                    expect(tab).toHaveClass(viewsClassMap[view]);
                });
            }
            cleanup();
        });
    });
});
