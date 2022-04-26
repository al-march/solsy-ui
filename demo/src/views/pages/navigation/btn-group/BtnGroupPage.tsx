import { Component, createSignal } from 'solid-js';
import { Page } from '../../base/Page';
import { ToggleButton, ToggleButtonsGroup } from '@solsy/ui/dist/navigation';

export const BtnGroupPage: Component = () => {
    const [btn, setBtn] = createSignal(3);

    return (
        <Page full class="p-4">
            <ToggleButtonsGroup
                onChange={(v) => setBtn(v)}
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
