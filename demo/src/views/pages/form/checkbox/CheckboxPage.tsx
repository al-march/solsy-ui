import {ComponentProps, ExampleTable, ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {Component} from '@shared/components/page/Component';
import {ArrMerge} from '@shared/utils/ArrMerge';
import {Badge} from '@ui/data-display';
import {Checkbox} from '@ui/form';
import {Divider, Row} from '@ui/layout';
import {DaisyColors, DaisyColorsSmall, DaisySizes} from '@ui/types';
import {For} from 'solid-js';

export const CheckboxPage = () => {
  const sizes = [...DaisySizes];
  const colors = ArrMerge([...DaisyColorsSmall], [undefined]);

  return (
    <Page full class="p-4">
      <Page.Section name="import">
        <ImportPreview component="Checkbox" />
      </Page.Section>

      <Page.Section name="view examples">
        <h2 class="text-2xl">View Examples</h2>
        <br />
        <ExampleTable
          class="table-compact w-full max-w-2xl"
          colors={colors}
          sizes={sizes}
          component={(color, size) => <Checkbox size={size} color={color} />}
        />
      </Page.Section>

      <Page.Section name="sizes">
        <Page.Title>Sizes</Page.Title>

        <Page.Component
          preview={
            <Row orientation="col" class="gap-2">
              <Checkbox size="lg" />
              <Checkbox size="md" />
              <Checkbox size="sm" />
              <Checkbox size="xs" />
            </Row>
          }
          snippet={`
            <Row orientation="col" class="gap-2">
              <Checkbox size="lg" />
              <Checkbox size="md" />
              <Checkbox size="sm" />
              <Checkbox size="xs" />
            </Row>
          `}
        />
      </Page.Section>

      <Page.Section name="colors">
        <Page.Title>Colors</Page.Title>

        <Page.Component
          preview={
            <Row orientation="col" class="gap-2">
              <Checkbox />
              <Checkbox color="secondary" />
              <Checkbox color="primary" />
              <Checkbox color="accent" />
            </Row>
          }
          snippet={`
            <Row orientation="col" class="gap-2">
              <Checkbox />
              <Checkbox color="secondary" />
              <Checkbox color="primary" />
              <Checkbox color="accent" />
            </Row>
          `}
        />
      </Page.Section>

      <Page.Section name="disabled">
        <Page.Title>Disabled</Page.Title>

        <Component
          preview={<Checkbox disabled />}
          snippet={`<Checkbox disabled />`}
        />
      </Page.Section>

      <Page.Section name="checked">
        <Page.Title>Checked</Page.Title>

        <Component
          preview={<Checkbox value />}
          snippet={`<Checkbox value />`}
        />
      </Page.Section>

      <Page.Section name="props">
        <Page.Title>Checkbox title</Page.Title>

        <Row orientation="col">
          <ComponentProps
            name="size"
            description="Size of the Autocomplete"
            types={
              <Row class="gap-2">
                <For each={DaisySizes}>
                  {size => <span class="badge badge-primary">{size}</span>}
                </For>
              </Row>
            }
          />

          <Divider />

          <ComponentProps
            name="color"
            description="Color of the Radio"
            types={
              <Row class="gap-2">
                <For each={DaisyColors}>
                  {color => <Badge color={color}>{color}</Badge>}
                </For>
              </Row>
            }
          />

          <Divider />

          <ComponentProps
            name="disabled"
            description="If `true`, the input will be disabled."
            types="boolean"
            defaultValue={false}
          />

          <Divider />

          <ComponentProps
            name="required"
            description="If `true`, the input will be required."
            types="boolean"
            defaultValue={false}
          />
        </Row>
      </Page.Section>
    </Page>
  );
};
