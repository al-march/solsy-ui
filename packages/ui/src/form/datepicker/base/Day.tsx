import {DatepickerSelectors, useDatepicker} from '../Datepicker';
import {DayModel} from '../models';
import {Dayjs} from 'dayjs';
import {createMemo, ParentProps} from 'solid-js';

const toISOString = (date?: Dayjs) => date?.toDate().toISOString();

export const DayBaseClasses = {
  default: 'btn-ghost',
  selected: 'btn-primary',
  today: 'btn-secondary',
  holiday: 'holiday',
};

type DayBaseProps = {
  selected?: boolean;
  holiday?: boolean;
  today?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
};

export const DayBase = (props: ParentProps<DayBaseProps>) => {
  return (
    <button
      data-testid={DatepickerSelectors.DAY}
      class={`btn h-full w-full m-auto flex justify-center items-center relative transition-opacity text-sm p-0 px-2 rounded-none`}
      classList={{
        [DayBaseClasses.selected]: props.selected,
        [DayBaseClasses.today]: props.today && !props.selected,
        [DayBaseClasses.default]:
          !props.holiday && !props.today && !props.selected,
        [DayBaseClasses.holiday]:
          props.holiday && !props.today && !props.selected,
      }}
      disabled={props.disabled}
      onClick={props.onSelect}
    >
      {props.children}
    </button>
  );
};

type DayProps = {
  day: DayModel;
  onSelect?: () => void;
};

export const Day = (props: ParentProps<DayProps>) => {
  const datepicker = useDatepicker();

  const isSelected = createMemo(
    () => toISOString(datepicker.state.selected) === toISOString(props.day.date)
  );
  const isHoliday = createMemo(() =>
    datepicker.state.weekHolidays?.includes(props.day.date.weekday())
  );

  return (
    <DayBase
      selected={isSelected()}
      holiday={isHoliday()}
      today={props.day.isToday}
      disabled={!props.day.fromCurrentMonth}
      onSelect={props.onSelect}
    >
      {props.day.date.format('D')}
    </DayBase>
  );
};
