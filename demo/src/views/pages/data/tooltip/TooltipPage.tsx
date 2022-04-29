import { Component, createSignal } from 'solid-js';
import { Page } from '../../base/Page';
import { Tooltip } from '../../../../../../packages/ui/src/data-display';
import { ButtonsGroupItem, ButtonsGroup } from '../../../../../../packages/ui/src/navigation';

type Position = 'left' | 'top' | 'right' | 'bottom';

export const TooltipPage: Component = () => {

    const [position, setPosition] = createSignal<Position>('left');

    function updatePosition(position: Position) {
        setPosition(position);
    }

    return (
        <Page full class="p-4">
            <h2 class="text-2xl">Tooltip</h2>

            <Tooltip message="Tooltip example" placement={position()}>
                <p class="p-2">Hover to text</p>
            </Tooltip>

            <ButtonsGroup defaultValue={position()} onChange={updatePosition}>
                <ButtonsGroupItem value="left"><Icon type="left"/></ButtonsGroupItem>
                <ButtonsGroupItem value="top"><Icon type="up"/></ButtonsGroupItem>
                <ButtonsGroupItem value="right"><Icon type="right"/></ButtonsGroupItem>
                <ButtonsGroupItem value="bottom"><Icon type="down"/></ButtonsGroupItem>
            </ButtonsGroup>
        </Page>
    );
};

const Icon = (props: { type: string }) => <i class={`fa-solid fa-angle-${props.type} text-2xl`}/>;
