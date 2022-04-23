import { Component, JSXElement, onMount } from 'solid-js';
import { useTabs } from './Tabs';

type Props = {
    label: JSXElement,
    index: number;
}

export const Tab: Component<Props> = (props) => {

    const tabs = useTabs();

    const isActive = () => tabs?.tab() === props.index;

    onMount(() => {
        if (isActive()) {
            setTab();
        }
    });

    function setTab() {
        tabs.setTab(props.index);
        tabs.setTabContent(props.children);
    }

    return (
        <div
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
