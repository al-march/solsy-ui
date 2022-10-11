import {ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {Autocomplete, AutocompleteOption} from '@ui/form';
import {Component, For} from 'solid-js';

export const AutocompletePage: Component = () => {
  return (
    <Page full class="p-4">
      <h2 class="text-2xl">Autocomplete</h2>

      <br />
      <ImportPreview component="Autocomplete" />
      <br />

      <div class="w-96 grid gap-2">
        <Autocomplete show placeholder="Выберете город" bordered>
          <For each={getMockOptions()}>
            {state => (
              <AutocompleteOption disabled={!state.active} value={state.city}>
                {state.city}
              </AutocompleteOption>
            )}
          </For>
        </Autocomplete>
      </div>
    </Page>
  );
};

function getMockOptions() {
  return [
    {
      city: 'Paris',
      active: true,
    },
    {
      city: 'Berlin',
      active: true,
    },
    {
      city: 'London',
      active: true,
    },
    {
      city: 'Moscow',
      active: false,
    },
    {
      city: 'Rome',
      active: true,
    },
    {
      city: 'Madrid',
      active: true,
    },
  ];
}
