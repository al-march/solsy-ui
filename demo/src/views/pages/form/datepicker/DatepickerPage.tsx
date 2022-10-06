import {Page} from '@page/base';
import {ImportPreview} from '@shared/components';
import {Datepicker} from '@ui/form';

export const DatepickerPage = () => {
  return (
    <Page full class="p-4">
      <h2 class="text-2xl">Datepicker</h2>

      <br />
      <ImportPreview component="Datepicker" />
      <br />

      <Datepicker
        placeholder="Select date"
        bordered
        weekHolidays={[0, 6]}
        placement="right"
      />
    </Page>
  );
};
