import { Datepicker } from '../../../../../../packages/ui/src/form';
import { Page } from '../../base/Page';

export const DatepickerPage = () => {
  const onNextMonth = (e) => {
    console.log(e);
  }
  return (
    <Page full class="p-4">
      <h2 class="text-2xl">Datepicker</h2>
      <br/>

      <Datepicker
        onNextMonth={onNextMonth}
        placeholder="Select date"
        bordered
        weekHolidays={[0, 6]}
        placement="right"
      />
    </Page>
  );
};
