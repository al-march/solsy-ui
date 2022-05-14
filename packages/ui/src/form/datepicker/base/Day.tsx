import { Component, createMemo } from 'solid-js';
import { DayModel } from '../models';
import { useDatepicker } from '../Datepicker';
import { Button, ButtonColor } from '../../../actions';
import './Day.css';
import { Dayjs } from 'dayjs';

const toISOString = (date?: Dayjs) => date?.toDate().toISOString();

type DayProps = {
    day: DayModel;
    onSelect: () => void;
}

export const Day: Component<DayProps> = (props) => {

    const datepicker = useDatepicker();

    const getDayNumber = createMemo(() => props.day.date.format('D'));
    const isSelected = createMemo(() => toISOString(datepicker.state.selected) === toISOString(props.day.date));
    const isHoliday = createMemo(() => datepicker.state.weekHolidays.includes(props.day.date.weekday()));
    const isToday = createMemo(() => props.day.isToday);

    const setColor = (): ButtonColor | undefined => {
        if (isSelected()) {
            return 'primary';
        }

        if (isToday()) {
            return 'secondary';
        }

        if (isHoliday()) {
            return;
        }

        return 'ghost';
    };

    return (
        <Button
            class="day"
            disabled={!props.day.fromCurrentMonth}
            color={setColor()}
            onClick={props.onSelect}
        >
            {getDayNumber()}
        </Button>
    );
};
