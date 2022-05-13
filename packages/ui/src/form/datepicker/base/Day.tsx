import { Component, createMemo } from 'solid-js';
import { DayModel } from '../models';
import { useDatepicker } from '../Datepicker';
import { Button, ButtonColor } from '../../../actions';
import './Day.css';

type DayProps = {
    day: DayModel;
    onSelect: () => void;
}

export const Day: Component<DayProps> = (props) => {

    const datepicker = useDatepicker();

    const isSelected = createMemo(() => (
        datepicker.state.selected?.toDate().toISOString() === props.day.date.toDate().toISOString()
    ));

    const isHoliday = createMemo(() => (
        datepicker.state.weekHolidays.includes(props.day.date.weekday())
    ));

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
            {props.day.date.format('D')}
        </Button>
    );
};
