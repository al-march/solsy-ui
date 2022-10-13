import {Placement} from '@popperjs/core';
import {Page} from '@shared/components/page';
import {Button} from '@ui/actions';
import {Row} from '@ui/layout';
import {BtnGroup, Menu} from '@ui/navigation';
import {createSignal} from 'solid-js';

export const PlacementExample = () => {
  const [placement, setPlacement] = createSignal<Placement>('bottom');

  const Icon = (props: {type: string}) => (
    <i class={`fa-solid fa-angle-${props.type}`} />
  );

  return (
    <Page.Component
      preview={
        <Row orientation="col" class="gap-4">
          <Menu closeOnBackdrop={false}>
            <Menu.Trigger>
              <Button color="primary" size="sm">
                <i class="fa-solid fa-bars" />
              </Button>
            </Menu.Trigger>
            <Menu.Dropdown placement={placement()}>
              <Menu.Item>Item 1</Menu.Item>
              <Menu.Item>Item 2</Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <BtnGroup<Placement>
            value={placement()}
            onInput={setPlacement}
            size="sm"
          >
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
        </Row>
      }
      snippet={`
          export const PlacementExample = () => {
          const [placement, setPlacement] = createSignal<Placement>('bottom');
          
          const Icon = (props: {type: string}) => (
            <i class={\`fa-solid fa-angle-\${props.type}\`} />
          );
        
          return (
            <Row orientation="col" class="gap-4">
              <Menu closeOnBackdrop={false}>
                <Menu.Trigger>
                  <Button color="primary" size="sm">
                    <i class="fa-solid fa-bars" />
                  </Button>
                </Menu.Trigger>
                <Menu.Dropdown placement={placement()}>
                  <Menu.Item>Item 1</Menu.Item>
                  <Menu.Item>Item 2</Menu.Item>
                </Menu.Dropdown>
              </Menu>
        
              <BtnGroup value={placement()} onInput={setPlacement} size="xs">
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
            </Row>
          )
        };`}
    />
  );
};
