import {ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {Input, Range} from '@ui/form';
import {Component, createSignal} from 'solid-js';

export const RangePage: Component = () => {
  const [value, setValue] = createSignal(0);
  const [range, setRange] = createSignal(10);

  return (
    <Page full class="p-4">
      <h2 class="text-2xl">Range</h2>

      <Page.Section name="import">
        <ImportPreview component="Range" />
      </Page.Section>

      <Page.Section name="usage">
        <div class="w-96">
          <Input
            type="text"
            placeholder="Set value"
            bordered
            value={value()}
            onInput={e =>
              setValue(Number((e.target as HTMLInputElement).value))
            }
          />
          <p class="py-4">Value: {value()}</p>
          <Range value={value()} onInput={setValue} color="primary" />

          <br />

          <Input
            type="text"
            placeholder="Set value"
            bordered
            value={range()}
            onInput={e =>
              setRange(Number((e.target as HTMLInputElement).value))
            }
          />
          <p class="py-4">Range: {range()}</p>
          <Range
            value={value()}
            step={range()}
            onInput={setValue}
            color="accent"
          />
        </div>
      </Page.Section>
    </Page>
  );
};
