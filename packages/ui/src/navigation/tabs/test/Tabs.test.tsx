import { Component, For } from 'solid-js';
import { cleanup, fireEvent, render, screen } from 'solid-testing-library';
import { Tabs, TabSize, TabsProps, TabView } from '../Tabs';
import { Tab } from '../Tab';
import { ObjectKeys } from '../../../utils/object';

const tabs = [
    {
        label: 'Tab label 1',
        content: 'Tab content 1'
    },
    {
        label: 'Tab label 2',
        content: 'Tab content 2'
    }
];

const TabsTest: Component<TabsProps> = (props) => {
    return (
        <Tabs {...props}>
            <For each={tabs}>
                {tab => (
                    <Tab label={tab.label}>
                        {tab.content}
                    </Tab>
                )}
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

    test('should render first tab without defaultValue prop', async () => {
        render(() => <TabsTest/>);
        const [tab] = tabs;
        expect(await screen.findByText(tab.content)).toBeInTheDocument();
    });

    test('should render tab by defaultValue', async () => {
        const value = 1;
        render(() => <TabsTest defaultValue={value}/>);
        expect(await screen.findByText(tabs[value].content)).toBeInTheDocument();
    });

    test('should set tab active by prop', async () => {
        render(() => <TabsTest defaultValue={0}/>);
        expect(isActive(screen.getAllByTestId('tab')[0])).toBeTruthy();
        cleanup();
        render(() => <TabsTest defaultValue={1}/>);
        expect(isActive(screen.getAllByTestId('tab')[1])).toBeTruthy();
    });

    test('should emit changes', () => {
        let value = -1;
        render(() => <TabsTest onInput={v => value = v}/>);
        const [first, second] = screen.getAllByTestId('tab');
        fireEvent.click(first);
        expect(value).toBe(0);
        fireEvent.click(second);
        expect(value).toBe(1);
    });

    test('should update tab content by click', async () => {
        render(() => <TabsTest/>);
        const [first, second] = screen.getAllByTestId('tab');
        fireEvent.click(second);
        expect(await screen.findByText(tabs[1].content));
        fireEvent.click(first);
        expect(await screen.findByText(tabs[0].content));
    });

    test('should set size class', () => {
        const sizesClassMap: Record<TabSize, string> = {
            xs: 'tab-xs',
            sm: 'tab-sm',
            md: 'tab-md',
            lg: 'tab-lg'
        };

        ObjectKeys(sizesClassMap).forEach(size => {
            render(() => <TabsTest size={size}/>);
            screen.getAllByTestId('tab').forEach(tab => {
                expect(tab).toHaveClass(sizesClassMap[size]);
            });
            cleanup();
        });
    });

    test('should set view class', () => {
        const viewsClassMap: Record<TabView, string> = {
            boxed: 'tabs-boxed',
            bordered: 'tab-bordered',
            lifted: 'tab-lifted',
        };

        ObjectKeys(viewsClassMap).forEach(view => {
            render(() => <TabsTest view={view}/>);

            if (view === 'boxed') {
                expect(screen.getByTestId('tabs')).toHaveClass(viewsClassMap[view]);
            } else {
                screen.getAllByTestId('tab').forEach(tab => {
                    expect(tab).toHaveClass(viewsClassMap[view]);
                });
            }
            cleanup();
        });
    });
});
