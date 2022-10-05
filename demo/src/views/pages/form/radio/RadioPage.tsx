import {Page} from '@page/base';
import {ExampleTable} from '@shared/components';
import {ArrMerge} from '@shared/utils/ArrMerge';
import {Radio} from '@ui/form';
import {DaisyColorsSmall, DaisySizes} from '@ui/types';
import {For} from 'solid-js';

export const RadioPage = () => {
  const sizes = [...DaisySizes];
  const colors = ArrMerge([...DaisyColorsSmall], [undefined]);

  return (
    <Page full class="p-4">
      <h2 class="text-2xl">Radio</h2>
      <br />

      <ExampleTable
        class="table-compact w-full max-w-2xl"
        colors={colors}
        sizes={sizes}
        component={(color, size) => (
          <Radio size={size} name={size} color={color} />
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
              <Radio id={size} name="size" size={size} />
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
              <Radio id={color || 'default'} name="color" color={color} />
            </div>
          )}
        </For>
      </div>
    </Page>
  );
};
