import {ComponentProps, ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {Badge} from '@ui/data-display';
import {Autocomplete, AutocompleteOption} from '@ui/form';
import {Divider, Row} from '@ui/layout';
import {DaisyColors, DaisySizes} from '@ui/types';
import {Component, For} from 'solid-js';

export const AutocompletePage: Component = () => {
  return (
    <Page full class="p-4">
      <Page.Section name="import">
        <ImportPreview component="Autocomplete" />
      </Page.Section>

      <Page.Section name="example usage">
        <Page.Title>Default usage</Page.Title>

        <Page.Component
          preview={
            <Autocomplete placeholder="Check city" bordered>
              <AutocompleteOption value="Paris" />
              <AutocompleteOption value="Tokio" />
              <AutocompleteOption value="Berlin" />
              <AutocompleteOption value="London" />
              <AutocompleteOption value="Moscow" disabled />
              <AutocompleteOption value="Madrid" />
            </Autocomplete>
          }
          snippet={`
            <Autocomplete placeholder="Выберете город" bordered>
              <AutocompleteOption value="Paris" />
              <AutocompleteOption value="Tokio" />
              <AutocompleteOption value="Berlin" />
              <AutocompleteOption value="London" />
              <AutocompleteOption value="Moscow" disabled />
              <AutocompleteOption value="Madrid" />
            </Autocomplete>
          `}
        />
      </Page.Section>

      <Page.Section name="Colors">
        <Page.Title>Colors</Page.Title>

        <Page.Component
          preview={
            <Row orientation="col" class="gap-2">
              <Autocomplete placeholder="primary" color="primary">
                <AutocompleteOption value="primary" />
              </Autocomplete>

              <Autocomplete placeholder="secondary" color="secondary">
                <AutocompleteOption value="secondary" />
              </Autocomplete>

              <Autocomplete placeholder="accent" color="accent">
                <AutocompleteOption value="accent" />
              </Autocomplete>

              <Autocomplete placeholder="info" color="info">
                <AutocompleteOption value="info" />
              </Autocomplete>

              <Autocomplete placeholder="success" color="success">
                <AutocompleteOption value="success" />
              </Autocomplete>

              <Autocomplete placeholder="warning" color="warning">
                <AutocompleteOption value="warning" />
              </Autocomplete>

              <Autocomplete placeholder="error" color="error">
                <AutocompleteOption value="error" />
              </Autocomplete>
            </Row>
          }
          snippet={`
            <Row orientation="col" class="gap-2">
              <Autocomplete placeholder="primary" color="primary">
                <AutocompleteOption value="primary" />
              </Autocomplete>

              <Autocomplete placeholder="secondary" color="secondary">
                <AutocompleteOption value="secondary" />
              </Autocomplete>

              <Autocomplete placeholder="accent" color="accent">
                <AutocompleteOption value="accent" />
              </Autocomplete>

              <Autocomplete placeholder="info" color="info">
                <AutocompleteOption value="info" />
              </Autocomplete>

              <Autocomplete placeholder="success" color="success">
                <AutocompleteOption value="success" />
              </Autocomplete>

              <Autocomplete placeholder="warning" color="warning">
                <AutocompleteOption value="warning" />
              </Autocomplete>

              <Autocomplete placeholder="error" color="error">
                <AutocompleteOption value="error" />
              </Autocomplete>
            </Row>
          `}
        />
      </Page.Section>

      <Page.Section name="sizes">
        <Page.Title>Sizes</Page.Title>

        <Page.Component
          preview={
            <Row orientation="col" class="gap-2">
              <Autocomplete placeholder="lg" size="lg">
                <AutocompleteOption value="lg" />
              </Autocomplete>
              <Autocomplete placeholder="md" size="md">
                <AutocompleteOption value="md" />
              </Autocomplete>
              <Autocomplete placeholder="sm" size="sm">
                <AutocompleteOption value="sm" />
              </Autocomplete>
              <Autocomplete placeholder="xs" size="xs">
                <AutocompleteOption value="xs" />
              </Autocomplete>
            </Row>
          }
          snippet={`
            <Row orientation="col" class="gap-2">
              <Autocomplete placeholder="lg" size="lg">
                <AutocompleteOption value="lg" />
              </Autocomplete>
              <Autocomplete placeholder="md" size="md">
                <AutocompleteOption value="md" />
              </Autocomplete>
              <Autocomplete placeholder="sm" size="sm">
                <AutocompleteOption value="sm" />
              </Autocomplete>
              <Autocomplete placeholder="xs" size="xs">
                <AutocompleteOption value="xs" />
              </Autocomplete>
            </Row>
          `}
        />
      </Page.Section>

      <Page.Section name="bordered">
        <Page.Title>Bordered</Page.Title>

        <Page.Component
          preview={<Autocomplete bordered placeholder="bordered" />}
          snippet={`
            <Autocomplete bordered placeholder="bordered" />
          `}
        />
      </Page.Section>

      <Page.Section name="error">
        <Page.Title>Error</Page.Title>

        <Page.Component
          preview={<Autocomplete error placeholder="error" />}
          snippet={`
            <Autocomplete error placeholder="error" />
          `}
        />
      </Page.Section>

      <Page.Section name="Props">
        <Page.Title>Autocomplete props</Page.Title>

        <p class="mb-4">
          Autocomplete has props as HTMLInputElement and the following:
        </p>

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
            description="Size of the Autocomplete"
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
            name="bordered"
            description="Autocomplete with border styles"
            types="boolean"
            defaultValue="false"
          />

          <Divider />

          <ComponentProps
            name="error"
            description="Autocomplete with error styles"
            types="boolean"
            defaultValue="false"
          />

          <Divider />

          <ComponentProps
            name="show"
            description="Show/hide of autocomplete dropdown"
            types="boolean"
            defaultValue="false"
          />
        </Row>
      </Page.Section>
    </Page>
  );
};
