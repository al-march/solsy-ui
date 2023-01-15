import {
  ComponentProps,
  ExampleTable,
  ImportPreview,
  TypeLine,
} from '@shared/components';
import {Page} from '@shared/components/page';
import {ArrMerge} from '@shared/utils/ArrMerge';
import {Button} from '@ui/actions';
import {Divider, Row} from '@ui/layout';
import {DaisyColor, DaisyColors, DaisySizes} from '@ui/types';
import {Component, For} from 'solid-js';

export const ButtonPage: Component = () => {
  const colors = ArrMerge<DaisyColor, 'ghost'>([...DaisyColors], ['ghost']);
  const sizes = [...DaisySizes];

  return (
    <Page full class="p-4">
      <h2 class="text-2xl">Buttons</h2>

      <Page.Section name={'Import'}>
        <br />
        <ImportPreview component="Button" />
      </Page.Section>

      <Page.Section name="View Examples">
        <Page.Title>View Examples</Page.Title>
        <br />
        <ExampleTable
          class="table-compact w-full"
          colors={colors}
          sizes={sizes}
          component={(color, size) => (
            <Button color={color} size={size}>
              Button
            </Button>
          )}
        />
      </Page.Section>

      <Page.Section name="usage">
        <Page.Title>Usage</Page.Title>

        <Page.Component
          preview={<Button>Button</Button>}
          snippet={`<Button>Button</Button>`}
        />
      </Page.Section>

      <Page.Section name={'Colors'}>
        <Page.Title>Colors</Page.Title>
        <p>
          Use <strong class="text-info">color</strong> prop to change color of
          the Button. You can set the value to: <br />
          <TypeLine types={colors} />
        </p>
        <br />

        <Page.Component
          preview={
            <Row class="gap-1 py-4">
              <Button>Button</Button>
              <Button color="primary">Button</Button>
              <Button color="secondary">Button</Button>
              <Button color="accent">Button</Button>
              <Button color="info">Button</Button>
              <Button color="success">Button</Button>
              <Button color="warning">Button</Button>
              <Button color="error">Button</Button>
              <Button color="ghost">Button</Button>
            </Row>
          }
          snippet={`
            <Row class="gap-1 py-4">
              <Button>Button</Button>
              <Button color="primary">Button</Button>
              <Button color="secondary">Button</Button>
              <Button color="accent">Button</Button>
              <Button color="info">Button</Button>
              <Button color="success">Button</Button>
              <Button color="warning">Button</Button>
              <Button color="error">Button</Button>
              <Button color="ghost">Button</Button>
            </Row>
          `}
        />
      </Page.Section>

      <Page.Section name="outline brands">
        <Page.Title>Outline buttons with brand colors</Page.Title>

        <Page.Component
          preview={
            <Row class="gap-1 py-4">
              <Button outline>Button</Button>
              <Button outline color="primary">
                Primary
              </Button>
              <Button outline color="secondary">
                Secondary
              </Button>
              <Button outline color="accent">
                Accent
              </Button>
            </Row>
          }
          snippet={`
            <Row class="gap-1 py-4">
              <Button outline>Button</Button>
              <Button outline color="primary">Primary</Button>
              <Button outline color="secondary">Secondary</Button>
              <Button outline color="accent">Accent</Button>
            </Row>
          `}
        />
      </Page.Section>

      <Page.Section name="outline states">
        <Page.Title>Outline buttons with state colors</Page.Title>
        <Page.Component
          preview={
            <Row class="gap-1 py-4">
              <Button outline color="info">
                Info
              </Button>
              <Button outline color="success">
                Success
              </Button>
              <Button outline color="warning">
                Warning
              </Button>
              <Button outline color="error">
                Error
              </Button>
            </Row>
          }
          snippet={`
            <Row class="gap-1 py-4">
              <Button outline color="info">Info</Button>
              <Button outline color="success">Success</Button>
              <Button outline color="warning">Warning</Button>
              <Button outline color="error">Error</Button>
            </Row>
          `}
        />
      </Page.Section>

      <Page.Section name="sizes">
        <Page.Title>Sizes</Page.Title>

        <p>
          Use the <strong class="text-info">size</strong> prop to change the
          size of the Button. You can set the value to: <br />
          <TypeLine types={sizes} />
        </p>

        <br />

        <Page.Component
          preview={
            <Row items="center" class="gap-1 py-4">
              <Button size="lg">Button</Button>
              <Button size="md">Button</Button>
              <Button size="sm">Button</Button>
              <Button size="xs">Button</Button>
            </Row>
          }
          snippet={`
            <Row items="center" class="gap-1 py-4">
              <Button size="lg">Button</Button>
              <Button size="md">Button</Button>
              <Button size="sm">Button</Button>
              <Button size="xs">Button</Button>
            </Row>
          `}
        />
      </Page.Section>

      <Page.Section name="responsive">
        <Page.Title>Responsive button</Page.Title>
        <p>
          This button will have different sizes on different browser viewpoints
        </p>
        <br />

        <Page.Component
          preview={
            <Button class="btn-xs sm:btn-sm md:btn-md lg:btn-lg">
              Responsive
            </Button>
          }
          snippet={`<Button class="btn-xs sm:btn-sm md:btn-md lg:btn-lg">Responsive</Button>`}
        />
      </Page.Section>

      <Page.Section name="wide">
        <Page.Title>Wide button</Page.Title>

        <Page.Component
          preview={<Button wide>Wide</Button>}
          snippet={`<Button wide>Wide</Button>`}
        />
      </Page.Section>

      <Page.Section name="glass">
        <Page.Title>Glass button</Page.Title>

        <Page.Component
          preview={
            <div class="bg-black p-4">
              <Button glass>Glass</Button>
            </div>
          }
          snippet={`<Button glass>Glass</Button>`}
        />
      </Page.Section>

      <Page.Section name="disabled">
        <Page.Title>Disabled button</Page.Title>

        <Page.Component
          preview={<Button disabled>Disabled</Button>}
          snippet={`<Button disabled>disabled</Button>`}
        />
      </Page.Section>

      <Page.Section name="square">
        <Page.Title>Square button</Page.Title>

        <Page.Component
          preview={
            <Row class="gap-2">
              <Button square>x</Button>
              <Button square outline>
                x
              </Button>
            </Row>
          }
          snippet={`
            <Row class="gap-2">
              <Button square>x</Button>
              <Button square outline>x</Button>
            </Row>
          `}
        />
      </Page.Section>

      <Page.Section name="circle">
        <Page.Title>Circle button</Page.Title>

        <Page.Component
          preview={
            <Row class="gap-2">
              <Button circle>x</Button>
              <Button circle outline>
                x
              </Button>
            </Row>
          }
          snippet={`
            <Row class="gap-2">
              <Button circle>x</Button>
              <Button circle outline>x</Button>
            </Row>
          `}
        />
      </Page.Section>

      <Page.Section name="Icon at start">
        <Page.Title>Icon at start</Page.Title>

        <Page.Component
          preview={
            <Button class="gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Button
            </Button>
          }
          snippet={`
            <Button class="gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              Button
            </Button>
          `}
        />
      </Page.Section>

      <Page.Section name="Icon at end">
        <Page.Title>Icon at end</Page.Title>

        <Page.Component
          preview={
            <Button class="gap-2">
              Button
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </Button>
          }
          snippet={`
            <Button class="gap-2">
              Button
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </Button>
          `}
        />
      </Page.Section>

      <Page.Section name="block">
        <Page.Title>Button block</Page.Title>

        <Page.Component
          preview={<Button block>block</Button>}
          snippet={`<Button block>block</Button>`}
        />
      </Page.Section>

      <Page.Section name="loading spinner">
        <Page.Title>Button with loading spinner</Page.Title>

        <Page.Component
          preview={<Button loading square />}
          snippet={`<Button loading square />`}
        />
      </Page.Section>

      <Page.Section name="loading with text">
        <Page.Title>Button with loading spinner and text</Page.Title>

        <Page.Component
          preview={<Button loading>Loading</Button>}
          snippet={`<Button loading>Loading</Button>`}
        />
      </Page.Section>

      <Page.Section name="no animation">
        <Page.Title>Button without click animation</Page.Title>

        <Page.Component
          preview={<Button noAnimation>No Animation</Button>}
          snippet={`<Button noAnimation>No Animation</Button>`}
        />
      </Page.Section>

      <Page.Section name="Props">
        <Page.Title>Button props</Page.Title>

        <Row orientation="col">
          <ComponentProps
            name="Size"
            description="The size of the Button"
            types={
              <div class="flex gap-2">
                <For each={DaisySizes}>
                  {size => <span class="badge badge-primary">{size}</span>}
                </For>
              </div>
            }
          />

          <Divider />

          <ComponentProps
            name="Color"
            description="The color of the Button"
            types={
              <div class="flex gap-2">
                <For each={DaisyColors}>
                  {color => <span class="badge badge-primary">{color}</span>}
                </For>
              </div>
            }
          />

          <Divider />

          <ComponentProps
            name="Disabled"
            description="Makes button disabled"
            types="boolean"
            defaultValue="false"
          />

          <Divider />

          <ComponentProps
            name="link"
            description="Button as link"
            types="boolean"
            defaultValue="false"
          />

          <Divider />

          <ComponentProps
            name="outline"
            description="Button with outline"
            types="boolean"
            defaultValue="false"
          />

          <Divider />

          <ComponentProps
            name="glass"
            description="Button with glass"
            types="boolean"
            defaultValue="false"
          />

          <Divider />

          <ComponentProps
            name="noAnimation"
            description="Button without animation"
            types="boolean"
            defaultValue="false"
          />

          <Divider />

          <ComponentProps
            name="loading"
            description="Loading mode"
            types="boolean"
            defaultValue="false"
          />

          <Divider />

          <ComponentProps
            name="wide"
            description="Wide mode"
            types="boolean"
            defaultValue="false"
          />

          <Divider />

          <ComponentProps
            name="block"
            description="Block mode"
            types="boolean"
            defaultValue="false"
          />

          <Divider />

          <ComponentProps
            name="circle"
            description="Circle mode"
            types="boolean"
            defaultValue="false"
          />

          <Divider />

          <ComponentProps
            name="square"
            description="Square mode"
            types="boolean"
            defaultValue="false"
          />
        </Row>
      </Page.Section>
    </Page>
  );
};
