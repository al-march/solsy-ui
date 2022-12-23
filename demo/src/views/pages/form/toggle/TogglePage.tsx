import {ExampleTable, ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {ArrMerge} from '@shared/utils/ArrMerge';
import {Toggle} from '@ui/form';
import {Row} from '@ui/layout';
import {DaisyColorsSmall, DaisySizes} from '@ui/types';
import {Component} from 'solid-js';

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
    </Page>
  );
};
