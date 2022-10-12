import {Code, ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {Button} from '@ui/actions';
import {Divider} from '@ui/layout';
import {Menu} from '@ui/navigation';
import {Component} from 'solid-js';

export const MenuPage: Component = () => {
  return (
    <Page full class="p-4">
      <Page.Section name="import">
        <ImportPreview component="Menu" />
      </Page.Section>

      <Page.Section name="usage">
        <h2 class="text-2xl">Default use</h2>
        <br />

        <Menu>
          <Menu.Trigger>
            <Button color="primary">Menu</Button>
          </Menu.Trigger>

          <Menu.Dropdown>
            <Menu.Item>
              <i class="fa-solid fa-car pr-2" />
              <span>Cars</span>
            </Menu.Item>
            <Menu.Item disabled>
              <i class="fa-solid fa-plane-departure pr-2" />
              <span>Plane</span>
            </Menu.Item>
            <Menu.Item>
              <i class="fa-solid fa-building pr-2" />
              <span>Buildings</span>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <Code>{`
          <Menu>
            <Menu.Trigger>
              <Button color="primary">Menu</Button>
            </Menu.Trigger>
          
            <Menu.Dropdown>
              <Menu.Item>
                <i class="fa-solid fa-car pr-2" />
                <span>Cars</span>
              </Menu.Item>
              <Menu.Item disabled>
                <i class="fa-solid fa-plane-departure pr-2" />
                <span>Plane</span>
              </Menu.Item>
              <Menu.Item>
                <i class="fa-solid fa-building pr-2" />
                <span>Buildings</span>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        `}</Code>
      </Page.Section>
    </Page>
  );
};
