import { Page } from '../../base/Page';
import { Collapse } from '../../../../../../packages/ui/src/data-display';

export const CollapsePage = () => {
  return (
    <Page full class="p-2">
      <h2 class="text-2xl">Popover</h2>
      <Collapse class="bg-base-300" icon="plus" label="Collapse item 2">
        Collapse content 2
      </Collapse>
    </Page>
  );
};
