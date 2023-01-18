import {ComponentProps, ExampleTable, ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {ArrMerge} from '@shared/utils/ArrMerge';
import {Badge} from '@ui/data-display';
import {Toggle} from '@ui/form';
import {Divider, Row} from '@ui/layout';
import {DaisyColors, DaisyColorsSmall, DaisySizes} from '@ui/types';
import {Component, For} from 'solid-js';

export const TogglePage: Component = () => {
  const sizes = [...DaisySizes];
  const colors = ArrMerge([...DaisyColorsSmall], [undefined]);

  return (
    <Page full class="p-4">
      <h2 class="text-2xl">Toggle</h2>

      <Page.Section name="import">
        <ImportPreview component="Toggle" />
      </Page.Section>

      <Page.Section name="View Examples">
        <h2 class="text-2xl">View Examples</h2>
        <br />
        <ExampleTable
          class="table-compact w-full max-w-2xl"
          colors={colors}
          sizes={sizes}
          component={(color, size) => (
            <Toggle size={size} name={size} color={color} />
          )}
        />
      </Page.Section>

      <Page.Section name="sizes">
        <Page.Title>Sizes</Page.Title>

        <Page.Component
          preview={
            <Row orientation="col" class="gap-2">
              <Toggle size="lg" />
              <Toggle size="md" />
              <Toggle size="sm" />
              <Toggle size="xs" />
            </Row>
          }
          snippet={`
            <Row orientation="col" class="gap-2">
              <Toggle size="lg" />
              <Toggle size="md" />
              <Toggle size="sm" />
              <Toggle size="xs" />
            </Row>
          `}
        />
      </Page.Section>

      <Page.Section name="colors">
        <Page.Title>Colors</Page.Title>

        <Page.Component
          preview={
            <Row orientation="col" class="gap-2">
              <Toggle color="primary" />
              <Toggle color="secondary" />
              <Toggle color="accent" />
            </Row>
          }
          snippet={`
            <Row orientation="col" class="gap-2">
              <Toggle color="primary" />
              <Toggle color="secondary" />
              <Toggle color="accent" />
            </Row>
          `}
        />
      </Page.Section>

      <Page.Section name="disabled">
        <Page.Title>Disabled</Page.Title>

        <Page.Component
          preview={
            <Row orientation="col" class="gap-2">
              <div class="flex items-center gap-3">
                <label>Disabled</label>
                <Toggle disabled />
              </div>

              <div class="flex items-center gap-3">
                <label>Disabled checked</label>
                <Toggle disabled value />
              </div>
            </Row>
          }
          snippet={`
            <Row orientation="col" class="gap-2">
              <div class="flex items-center gap-3">
                <label>Disabled</label>
                <Toggle disabled />
              </div>
              
              <div class="flex items-center gap-3">
                <label>Disabled checked</label>
                <Toggle disabled value />
              </div>
            </Row>
          `}
        />
      </Page.Section>

      <Page.Section name="Indeterminate">
        <Page.Title>Indeterminate</Page.Title>

        <Page.Component
          preview={<Toggle indeterminate />}
          snippet={`<Toggle indeterminate />`}
        />
      </Page.Section>

      <Page.Section name="props">
        <Page.Title>Toggle props</Page.Title>

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
            description="Color of the Toggle"
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
