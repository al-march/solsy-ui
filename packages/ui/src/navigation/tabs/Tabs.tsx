import { Accessor, Component, createContext, createSignal, For, JSXElement, useContext } from 'solid-js';

type TabsContext = {
    tab: Accessor<number>;
    tabContent: JSXElement;
    setTab: (tab: number) => void;
    setTabContent: (content: JSXElement) => void;
}

const TabsContext = createContext<TabsContext>();

type Props = {
    tabList: JSXElement[];
}

/**
 *
 * @example
 *  <Tabs
 *      tabList={[
 *          <Tab label="Tab 1" index={0}>Content of 1</Tab>,
 *          <Tab label="Tab 2" index={1}>Content of 2</Tab>,
 *          <Tab label="Tab 3" index={2}>Content of 3</Tab>,
 *      ]}
 *  />
 */
export const Tabs: Component<Props> = (props) => {

    const [tab, setTab] = createSignal<number>(0);
    const [tabContent, setTabContent] = createSignal<JSXElement>();

    const store: TabsContext = {
        tab,
        tabContent,
        setTab(tab) {
            setTab(tab);
        },
        setTabContent(content) {
            setTabContent(content);
        }
    };

    return (
        <TabsContext.Provider value={store}>
            <div class="tabs tabs-boxed">
                <For each={props.tabList}>
                    {tab => tab}
                </For>
            </div>

            <div class="p-4">
                {tabContent()}
            </div>
        </TabsContext.Provider>
    );
};

export const useTabs = () => useContext(TabsContext)!;
