import { createMemo, For } from 'solid-js';
import dayjs, { Dayjs } from 'dayjs';
import { Day } from './Day';
import { DayModel } from '../models';
import { DatepickerSelectors } from '../Datepicker';

export type MonthProps = {
  month: Dayjs;
  onSelectDay?: (day: Dayjs) => void;
}

export const Month = (props: MonthProps) => {

  const month = createMemo(() => getMonthDays(props.month));
  const week = createMemo(() => getWeek());

  return (
    <div
      data-testid={DatepickerSelectors.MONTH}
      class="month w-full flex flex-col flex-1"
    >
      <header class="py-1 grid grid-cols-7">
        <For each={week()}>
          {day => (
            <div class="justify-self-center self-center font-semibold text-sm">
              {day}
            </div>
          )}
        </For>
      </header>

      <div class="divider m-0 h-0"/>

      <section class="month-days flex-1 grid grid-cols-7">
        <For each={month()}>
          {day => (
            <Day
              day={day}
              onSelect={() => props.onSelectDay?.(day.date)}
            />
          )}
        </For>
      </section>
    </div>
  );
};

function getMonthDays(month: Dayjs) {
  const clone = month.clone();
  const monthDays = getDaysOfMonth(clone);
  const daysBefore = getDaysBefore(monthDays[0].date);
  const daysAfter = getDaysAfter(monthDays[monthDays.length - 1].date);

  return [...daysBefore, ...monthDays, ...daysAfter];
}

function getDaysOfMonth(currentMonth: Dayjs) {
  const output: DayModel[] = [];
  const allDays = currentMonth.daysInMonth();

  let count = 1;
  while (count <= allDays) {
    const date = dayjs(new Date(currentMonth.year(), currentMonth.month(), count));
    const isToday = date.toISOString() === dayjs().startOf('day').toISOString();
    const day = new DayModel(date, true, isToday);
    output.push(day);
    count++;
  }

  return output;
}

function getDaysBefore(firstDay: Dayjs) {
  const output: DayModel[] = [];
  const dayOfWeek = firstDay.weekday();

  let count = 0;
  while (dayOfWeek !== count) {
    const date = firstDay.subtract(dayOfWeek - count, 'day');
    const day = new DayModel(date, false, false);
    output.push(day);
    count++;
  }

  return output;
}

function getDaysAfter(lastDay: Dayjs) {
  const output: DayModel[] = [];
  let dayOfWeek = lastDay.weekday();

  let dayIncrement = 1;
  const count = 6;
  while (dayOfWeek !== count) {
    const date = lastDay.add(dayIncrement++, 'day');
    const day = new DayModel(date, false, false);
    output.push(day);
    dayOfWeek++;
  }

  return output;
}

function getWeek() {
  return new Array(7)
    .fill(0)
    .map((day, index) => (
      dayjs().weekday(day + index).format('dd')
    ));
}
