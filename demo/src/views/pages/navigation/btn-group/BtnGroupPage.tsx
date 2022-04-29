import { Component, createSignal } from 'solid-js';
import { Page } from '../../base/Page';
import { ButtonGroup, ButtonsGroup } from '../../../../../../packages/ui/src/navigation';

export const BtnGroupPage: Component = () => {
    const [btn, setBtn] = createSignal();

    function onButtonsChange(v: any) {
        setBtn(v);
        console.log(v);
    }

    return (
        <Page full class="p-4">
            <ButtonsGroup
                value={btn()}
                onInput={onButtonsChange}
                size="sm"
            >
                <ButtonGroup>1</ButtonGroup>
                <ButtonGroup>2</ButtonGroup>
                <ButtonGroup defaultChecked>3</ButtonGroup>
            </ButtonsGroup>
        </Page>
    );
};
