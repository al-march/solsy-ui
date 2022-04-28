import { Component, createSignal } from 'solid-js';
import { Page } from '../../base/Page';
import { ToggleButton, ToggleButtonsGroup } from '../../../../../../packages/ui/src/navigation';

export const BtnGroupPage: Component = () => {
    const [btn, setBtn] = createSignal();

    function onButtonsChange(v: any) {
        setBtn(v);
        console.log(v);
    }

    return (
        <Page full class="p-4">
            <ToggleButtonsGroup
                onChange={onButtonsChange}
                defaultValue={btn()}
                multiple
            >
                <ToggleButton value={1}>1</ToggleButton>
                <ToggleButton value={2}>2</ToggleButton>
                <ToggleButton value={3}>3</ToggleButton>
            </ToggleButtonsGroup>
        </Page>
    );
};
