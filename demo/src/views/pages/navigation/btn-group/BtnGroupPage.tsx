import { Component, createSignal } from 'solid-js';
import { Page } from '../../base/Page';
import { ButtonsGroupItem, ButtonsGroup } from '../../../../../../packages/ui/src/navigation';

export const BtnGroupPage: Component = () => {
    const [btn, setBtn] = createSignal(2);

    function onButtonsChange(v: any) {
        setBtn(v);
        console.log(v);
    }

    return (
        <Page full class="p-4">
            <ButtonsGroup
                value={btn()}
                onInput={onButtonsChange}
            >
                <ButtonsGroupItem>1</ButtonsGroupItem>
                <ButtonsGroupItem>2</ButtonsGroupItem>
                <ButtonsGroupItem>3</ButtonsGroupItem>
            </ButtonsGroup>
        </Page>
    );
};
