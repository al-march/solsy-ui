import {ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {Collapse} from '@ui/data-display';

export const CollapsePage = () => {
  return (
    <Page full class="p-4">
      <Page.Section name="import">
        <ImportPreview component="Collapse" />
      </Page.Section>

      <Collapse class="bg-base-300" icon="plus" label="Collapse item 2">
        Collapse content 2
      </Collapse>
    </Page>
  );
};
