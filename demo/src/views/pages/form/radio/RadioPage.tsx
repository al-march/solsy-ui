import {ExampleTable, ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {ArrMerge} from '@shared/utils/ArrMerge';
import {Radio} from '@ui/form';
import {Row} from '@ui/layout';
import {DaisyColorsSmall, DaisySizes} from '@ui/types';

export const RadioPage = () => {
  const sizes = [...DaisySizes];
  const colors = ArrMerge([...DaisyColorsSmall], [undefined]);

  return (
    <Page full class="p-4">
      <Page.Section name="import">
        <ImportPreview component="Radio" />
      </Page.Section>

      <Page.Section name="View Examples">
        <h2 class="text-2xl">View Examples</h2>
        <br />
        <ExampleTable
          class="table-compact w-full max-w-2xl"
          colors={colors}
          sizes={sizes}
          component={(color, size) => (
            <Radio size={size} name={size} color={color} />
          )}
        />
      </Page.Section>

      <Page.Section name="sizes">
        <Page.Title>Sizes</Page.Title>

        <Page.Component
          preview={
            <Row orientation="col" class="gap-2">
              <Row items="center">
                <label for="size-lg" class="w-12 opacity-75 cursor-pointer">
                  lg
                </label>
                <Radio id="size-lg" name="size" size="lg" />
              </Row>
              <Row items="center">
                <label for="size-md" class="w-12 opacity-75 cursor-pointer">
                  md
                </label>
                <Radio id="size-md" name="size" size="md" />
              </Row>
              <Row items="center">
                <label for="size-sm" class="w-12 opacity-75 cursor-pointer">
                  sm
                </label>
                <Radio id="size-sm" name="size" size="sm" />
              </Row>
              <Row items="center">
                <label for="size-xs" class="w-12 opacity-75 cursor-pointer">
                  xs
                </label>
                <Radio id="size-xs" name="size" size="xs" />
              </Row>
            </Row>
          }
          snippet={`
            <Row orientation="col" class="gap-2">
              <Row items="center">
                <label for="size-lg" class="w-12 opacity-75 cursor-pointer">
                  lg
                </label>
                <Radio id="size-lg" name="size" size="lg" />
              </Row>
              <Row items="center">
                <label for="size-md" class="w-12 opacity-75 cursor-pointer">
                  md
                </label>
                <Radio id="size-md" name="size" size="md" />
              </Row>
              <Row items="center">
                <label for="size-sm" class="w-12 opacity-75 cursor-pointer">
                  sm
                </label>
                <Radio id="size-sm" name="size" size="sm" />
              </Row>
              <Row items="center">
                <label for="size-xs" class="w-12 opacity-75 cursor-pointer">
                  xs
                </label>
                <Radio id="size-xs" name="size" size="xs" />
              </Row>
            </Row>
          `}
        />
      </Page.Section>

      <Page.Section name="colors">
        <Page.Title>Colors</Page.Title>

        <Page.Component
          preview={
            <Row orientation="col" class="gap-2">
              <Row>
                <label for="default" class="w-24 opacity-75 cursor-pointer">
                  default
                </label>
                <Radio id="default" name="color" />
              </Row>
              <Row>
                <label for="secondary" class="w-24 opacity-75 cursor-pointer">
                  secondary
                </label>
                <Radio id="secondary" name="color" color="secondary" />
              </Row>
              <Row>
                <label for="primary" class="w-24 opacity-75 cursor-pointer">
                  primary
                </label>
                <Radio id="primary" name="color" color="primary" />
              </Row>
              <Row>
                <label for="accent" class="w-24 opacity-75 cursor-pointer">
                  accent
                </label>
                <Radio id="accent" name="color" color="accent" />
              </Row>
            </Row>
          }
          snippet={`
            <Row orientation="col" class="gap-2">
              <Row>
                <label for="default" class="w-24 opacity-75 cursor-pointer">
                  default
                </label>
                <Radio id="default" name="color" />
              </Row>
              <Row>
                <label for="secondary" class="w-24 opacity-75 cursor-pointer">
                  secondary
                </label>
                <Radio id="secondary" name="color" color="secondary" />
              </Row>
              <Row>
                <label for="primary" class="w-24 opacity-75 cursor-pointer">
                  primary
                </label>
                <Radio id="primary" name="color" color="primary" />
              </Row>
              <Row>
                <label for="accent" class="w-24 opacity-75 cursor-pointer">
                  accent
                </label>
                <Radio id="accent" name="color" color="accent" />
              </Row>
            </Row>
          `}
        />
      </Page.Section>

      <Page.Section name="disabled">
        <Page.Title>Disabled</Page.Title>

        <Page.Component
          preview={<Radio disabled value />}
          snippet={`<Radio disabled value />`}
        />
      </Page.Section>
    </Page>
  );
};
