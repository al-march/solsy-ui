import { Datepicker } from '../../../../../../packages/ui/src/form';
import { Page } from '../../base/Page';

export const DatepickerPage = () => {
    return (
        <Page full class="p-4">
            <h2 class="text-2xl">Datepicker</h2>
            <br/>

            <Datepicker
                placeholder="Select date"
                bordered
                weekHolidays={[0, 6]}
            />
        </Page>
    );
};
