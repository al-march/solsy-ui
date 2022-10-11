import {ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {Datepicker} from '@ui/form';

export const DatepickerPage = () => {
  return (
    <Page full class="p-4">
      <Page.Section name="import">
        <ImportPreview component="Datepicker" />
      </Page.Section>

      <Datepicker
        placeholder="Select date"
        bordered
        weekHolidays={[0, 6]}
        placement="right"
      />
    </Page>
  );
};
