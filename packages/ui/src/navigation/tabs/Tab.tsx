import { Component, createSignal, JSXElement, onMount } from 'solid-js';
import { useTabs } from './Tabs';

type Props = {
    label: JSXElement,
}

export const Tab: Component<Props> = (props) => {
    const context = useTabs();
    const [index, setIndex] = createSignal(-1);

    const isActive = () => context.state.activeTabIndex === index();

    onMount(() => {
        if (isActive()) {
            setTab();
        }
    });

    function setTab() {
        context.setActiveTab(index());
        context.setTabContent(props.children);
    }

    function initTab(node: HTMLElement) {
        setIndex(context.initTab(node));
    }

    return (
        <div
            ref={initTab}
            class="tab"
            classList={{
                'tab-active': isActive()
            }}
            onClick={setTab}
        >
            {props.label}
        </div>
    );
};
