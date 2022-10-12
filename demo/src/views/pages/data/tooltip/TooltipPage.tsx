import {Code, ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {Tooltip} from '@ui/data-display';
import {BtnGroup} from '@ui/navigation';
import {Component, createSignal} from 'solid-js';

type Position = 'left' | 'top' | 'right' | 'bottom';

export const TooltipPage: Component = () => {
  const [position, setPosition] = createSignal<Position>('left');

  function updatePosition(position: Position) {
    setPosition(position);
  }

  return (
    <Page full class="p-4">
      <h2 class="text-2xl">Tooltip</h2>

      <Page.Section name="import">
        <ImportPreview component="Tooltip" />
      </Page.Section>

      <Page.Section name="usage">
        <Tooltip message="Tooltip example" placement={position()}>
          <p class="p-2">Hover to text</p>
        </Tooltip>

        <BtnGroup value={position()} onInput={updatePosition} size="sm">
          <BtnGroup.Item value="left">
            <Icon type="left" />
          </BtnGroup.Item>
          <BtnGroup.Item value="top">
            <Icon type="up" />
          </BtnGroup.Item>
          <BtnGroup.Item value="right">
            <Icon type="right" />
          </BtnGroup.Item>
          <BtnGroup.Item value="bottom">
            <Icon type="down" />
          </BtnGroup.Item>
        </BtnGroup>

        <Code>{`
          <Tooltip message="Tooltip example">
            <p class="p-2">Hover to text</p>
          </Tooltip>
        `}</Code>
      </Page.Section>
    </Page>
  );
};

const Icon = (props: {type: string}) => (
  <i class={`fa-solid fa-angle-${props.type}`} />
);
