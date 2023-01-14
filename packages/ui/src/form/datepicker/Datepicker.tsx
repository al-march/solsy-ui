import {Popover} from '../../data-display';
import {Input, InputProps} from '../input';
import {DatepickerNav, Month} from './base';
import {Placement} from '@popperjs/core';
import dayjs, {Dayjs} from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import weekday from 'dayjs/plugin/weekday';
import {createContext, ParentProps, splitProps, useContext} from 'solid-js';
import {createStore} from 'solid-js/store';

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.extend(localizedFormat);

export const DatepickerSelectors = {
  DATEPICKER: 'datepicker',
  NAV: 'nav',
  NAV_MONTH_LABEL: 'month-label',
  NAV_YEAR_LABEL: 'year-label',
  MONTH: 'month',
  DAY: 'day',
};

type DatepickerContext = {
  state: DatepickerState;
  onSelectDay: (day: Dayjs) => void;
  onNextMonth: (month: Dayjs) => void;
  onPrevMonth: (month: Dayjs) => void;
  close: () => void;
  open: () => void;
};

type DatepickerState = {
  show: boolean;
  selected?: Dayjs;
  month: Dayjs;
  weekHolidays: number[];
};

export type DatepickerProps = {
  show?: boolean;
  value?: string | number | Dayjs | Date;
  month?: Dayjs;
  onNextMonth?: (month: Dayjs) => void;
  onPrevMonth?: (month: Dayjs) => void;
  onSelectDay?: (day: Dayjs) => void;
  onOpen?: () => void;
  onClose?: () => void;
  placement?: Placement;
  weekHolidays?: number[];
  closeOnSelect?: boolean;
} & Omit<InputProps, 'value'>;

export const Datepicker = (props: ParentProps<DatepickerProps>) => {
  const [local, others] = splitProps(props, [
    'show',
    'value',
    'month',
    'onNextMonth',
    'onPrevMonth',
    'onSelectDay',
    'onOpen',
    'onClose',
    'placement',
    'weekHolidays',
    'closeOnSelect',
  ]);

  const [state, setState] = createStore<DatepickerState>({
    show: !!local.show,
    selected: local.value ? dayjs(local.value) : undefined,
    month: local.month || dayjs(),
    weekHolidays: local.weekHolidays || [],
  });

  function open() {
    if (!state.show) {
      setState('show', true);
      local.onOpen?.();
    }
  }

  function close() {
    if (state.show) {
      setState('show', false);
      local.onClose?.();
    }
  }

  function onNextMonth() {
    const month = state.month.add(1, 'month');
    setState('month', month);
    local.onNextMonth?.(month);
  }

  function onPrevMonth() {
    const month = state.month.subtract(1, 'month');
    setState('month', month);
    local.onPrevMonth?.(month);
  }

  function onSelectDay(day: Dayjs) {
    setState('selected', day);
    local.onSelectDay?.(day);
    if (local.closeOnSelect) {
      close();
    }
  }

  function onInput(value: string) {
    const date = dayjs(value);
    const format = date.format('YYYY.MM.DD');

    if (format !== 'Invalid Date') {
      setState('selected', date);
      setState('month', date);
    }
  }

  return (
    <DatepickerCtx.Provider
      value={{
        state,
        close,
        open,
        onSelectDay,
        onNextMonth,
        onPrevMonth,
      }}
    >
      <Popover
        onClose={close}
        onOpen={open}
        show={state.show}
        placement={local.placement}
        trigger={
          <Input
            value={state.selected?.format('YYYY.MM.DD')}
            onChange={e => onInput(e.currentTarget.value)}
            onFocus={() => open()}
            {...others}
          />
        }
      >
        <div
          data-testid={DatepickerSelectors.DATEPICKER}
          class="shadow-xl bg-base-300 rounded-lg overflow-hidden"
        >
          <DatepickerNav
            month={state.month}
            onNext={onNextMonth}
            onPrev={onPrevMonth}
          />

          <Month month={state.month} onSelectDay={onSelectDay} />
        </div>
      </Popover>
    </DatepickerCtx.Provider>
  );
};

const DatepickerCtx = createContext<DatepickerContext>();

export const useDatepicker = () => {
  const ctx = useContext(DatepickerCtx);
  if (ctx) {
    return ctx;
  }
  throw new Error('No context for datepicker');
};
