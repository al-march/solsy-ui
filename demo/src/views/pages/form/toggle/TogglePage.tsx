import {Page} from '@page/base';
import {ExampleTable, ImportPreview} from '@shared/components';
import {ArrMerge} from '@shared/utils/ArrMerge';
import {Toggle} from '@ui/form';
import {DaisyColorsSmall, DaisySizes} from '@ui/types';
import {Component, For} from 'solid-js';

export const TogglePage: Component = () => {
  const sizes = [...DaisySizes];
  const colors = ArrMerge([...DaisyColorsSmall], [undefined]);

  return (
    <Page full class="p-4">
      <h2 class="text-2xl">Toggle</h2>

      <br />
      <ImportPreview component="Toggle" />
      <br />

      <ExampleTable
        class="table-compact w-full max-w-2xl"
        colors={colors}
        sizes={sizes}
        component={(color, size) => (
          <Toggle size={size} name={size} color={color} />
        )}
      />

      <br />
      <h3 class="text-xl">Sizes</h3>
      <br />
      <div class="flex flex-col gap-2">
        <For each={sizes}>
          {size => (
            <div class="flex items-center gap-2">
              <label for={size} class="w-12 opacity-75 cursor-pointer">
                {size}
              </label>
              <Toggle id={size} name="size" size={size} />
            </div>
          )}
        </For>
      </div>

      <br />
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
              <Toggle id={color || 'default'} name="color" color={color} />
            </div>
          )}
        </For>
      </div>

      <br />
      <h3 class="text-xl">Disabled</h3>
      <br />
      <div class="flex items-center gap-3">
        <label>Disabled</label>
        <Toggle disabled />
      </div>
      <div class="flex items-center gap-3">
        <label>Disabled checked</label>
        <Toggle disabled value />
      </div>

      <br />
      <h3 class="text-xl">Indeterminate</h3>
      <br />
      <Toggle indeterminate />
    </Page>
  );
};
