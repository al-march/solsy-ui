import {ExampleTable, ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {ArrMerge} from '@shared/utils/ArrMerge';
import {Checkbox} from '@ui/form';
import {DaisyColorsSmall, DaisySizes} from '@ui/types';
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
        <h3 class="text-xl">Sizes</h3>
        <br />
        <div class="flex flex-col gap-2">
          <For each={sizes}>
            {size => (
              <div class="flex items-center gap-2">
                <label for={size} class="w-12 opacity-75 cursor-pointer">
                  {size}
                </label>
                <Checkbox id={size} size={size} />
              </div>
            )}
          </For>
        </div>
      </Page.Section>

      <Page.Section name="colors">
        <h3 class="text-xl">Colors</h3>
        <br />
        <div class="flex flex-col gap-2">
          <For each={colors}>
            {color => (
              <div class="flex items-center gap-2">
                <label
                  for={color || 'default'}
                  class="w-24 opacity-75 cursor-pointer"
                >
                  {color || 'default'}
                </label>
                <Checkbox id={color || 'default'} color={color} />
              </div>
            )}
          </For>
        </div>
      </Page.Section>
    </Page>
  );
};
