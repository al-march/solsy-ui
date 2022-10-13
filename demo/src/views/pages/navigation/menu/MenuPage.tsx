import {PlacementExample} from './examples/Placement';
import {ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {Button} from '@ui/actions';
import {Menu} from '@ui/navigation';
import {Component} from 'solid-js';

export const MenuPage: Component = () => {
  return (
    <Page full class="p-4">
      <Page.Section name="import">
        <ImportPreview component="Menu" />
      </Page.Section>

      <Page.Section name="usage">
        <Page.Title>Default usage</Page.Title>

        <Page.Component
          preview={
            <Menu>
              <Menu.Trigger>
                <Button color="primary">Menu</Button>
              </Menu.Trigger>

              <Menu.Dropdown>
                <Menu.Item>
                  <i class="fa-solid fa-car" />
                  <span>Cars</span>
                </Menu.Item>
                <Menu.Item disabled>
                  <i class="fa-solid fa-plane-departure" />
                  <span>Plane</span>
                </Menu.Item>
                <Menu.Item>
                  <i class="fa-solid fa-building" />
                  <span>Buildings</span>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          }
          snippet={`
            <Menu>
              <Menu.Trigger>
                <Button color="primary">Menu</Button>
              </Menu.Trigger>
            
              <Menu.Dropdown>
                <Menu.Item>
                  <i class="fa-solid fa-car" />
                  <span>Cars</span>
                </Menu.Item>
                <Menu.Item disabled>
                  <i class="fa-solid fa-plane-departure" />
                  <span>Plane</span>
                </Menu.Item>
                <Menu.Item>
                  <i class="fa-solid fa-building" />
                  <span>Buildings</span>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          `}
        />
      </Page.Section>

      <Page.Section name="usage with state">
        <Page.Title>Usage with state</Page.Title>

        <Page.Component
          preview={
            <Menu>
              {state => (
                <>
                  <Menu.Trigger>
                    <Button color="primary" class="gap-2">
                      {state.show ? 'Opened' : 'Closed'}
                      <i
                        class="fa-solid fa-chevron-up font-bold transition-transform"
                        classList={{'rotate-180': state.show}}
                      />
                    </Button>
                  </Menu.Trigger>

                  <Menu.Dropdown>
                    <Menu.Item>
                      <i class="fa-solid fa-car" />
                      <span>Cars</span>
                    </Menu.Item>
                    <Menu.Item>
                      <i class="fa-solid fa-building" />
                      <span>Buildings</span>
                    </Menu.Item>
                  </Menu.Dropdown>
                </>
              )}
            </Menu>
          }
          snippet={`
            <Menu>
              {state => (
                <>
                  <Menu.Trigger>
                    <Button color="primary" class="gap-2">
                      {state.show ? 'Opened' : 'Closed'}
                      <i
                        class="fa-solid fa-chevron-up font-bold transition-transform"
                        classList={{'rotate-180': state.show}}
                      />
                    </Button>
                  </Menu.Trigger>
    
                  <Menu.Dropdown>
                    <Menu.Item>
                      <i class="fa-solid fa-car" />
                      <span>Cars</span>
                    </Menu.Item>
                    <Menu.Item>
                      <i class="fa-solid fa-building" />
                      <span>Buildings</span>
                    </Menu.Item>
                  </Menu.Dropdown>
                </>
              )}
            </Menu>
          `}
        />
      </Page.Section>

      <Page.Section name="Compact menu">
        <Page.Title>Compact menu</Page.Title>

        <Page.Component
          preview={
            <Menu>
              <Menu.Trigger>
                <Button color="primary">Menu</Button>
              </Menu.Trigger>

              <Menu.Dropdown compact>
                <Menu.Item>
                  <i class="fa-solid fa-car" />
                  <span>Cars</span>
                </Menu.Item>
                <Menu.Item>
                  <i class="fa-solid fa-building" />
                  <span>Buildings</span>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          }
          snippet={`
            <Menu>
              <Menu.Trigger>
                <Button color="primary">Menu</Button>
              </Menu.Trigger>

              <Menu.Dropdown compact>
                <Menu.Item>
                  <i class="fa-solid fa-car" />
                  <span>Cars</span>
                </Menu.Item>
                <Menu.Item>
                  <i class="fa-solid fa-building" />
                  <span>Buildings</span>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          `}
        />
      </Page.Section>

      <Page.Section name="Menu placement">
        <Page.Title>Menu Placement</Page.Title>
        <PlacementExample />
      </Page.Section>
    </Page>
  );
};
