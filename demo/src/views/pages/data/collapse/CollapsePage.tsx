import {ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {Collapse} from '@ui/data-display';

export const CollapsePage = () => {
  return (
    <Page full class="p-4">
      <h2 class="text-2xl">Popover</h2>

      <br />
      <ImportPreview component="Collapse" />
      <br />

      <Collapse class="bg-base-300" icon="plus" label="Collapse item 2">
        Collapse content 2
      </Collapse>
    </Page>
  );
};
