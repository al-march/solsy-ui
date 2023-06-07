import {InputSelectors} from '../../input';
import {Datepicker, DatepickerSelectors} from '../Datepicker';
import {DatepickerNav, DayBase, DayBaseClasses} from '../base';
import dayjs, {Dayjs} from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import weekday from 'dayjs/plugin/weekday';
import {cleanup, fireEvent, render, screen} from '@solidjs/testing-library';

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.extend(localizedFormat);

const {DATEPICKER, NAV, NAV_YEAR_LABEL, NAV_MONTH_LABEL, DAY} =
  DatepickerSelectors;
const {INPUT} = InputSelectors;
const DEFAULT_FORMAT = 'YYYY.MM.DD';

const toISOString = (date: Dayjs) => date.toDate().toISOString();

describe('Datepicker', () => {
  describe('main', () => {
    test('should be rendered', () => {
      render(() => <Datepicker />);
      expect(screen.queryByTestId(INPUT)).toBeInTheDocument();
    });

    test('should be opened with props', () => {
      render(() => <Datepicker show />);
      expect(screen.queryByTestId(DATEPICKER)).toBeInTheDocument();
    });

    test('should be opened by click on Input', () => {
      render(() => <Datepicker />);
      expect(screen.queryByTestId(DATEPICKER)).not.toBeInTheDocument();
      fireEvent.click(screen.getByTestId(INPUT));
      expect(screen.queryByTestId(DATEPICKER)).toBeInTheDocument();
    });

    test('should emit onOpen', () => {
      const onOpen = jest.fn();
      render(() => <Datepicker onOpen={onOpen} />);
      fireEvent.click(screen.getByTestId(INPUT));
      expect(onOpen).toBeCalled();
    });

    test('should emit onClose', () => {
      const onClose = jest.fn();
      render(() => <Datepicker show onClose={onClose} />);
      fireEvent.click(document.body);
      expect(onClose).toBeCalled();
    });

    test('should set placeholder to input', () => {
      const placeholder = 'placeholder';
      render(() => <Datepicker placeholder={placeholder} />);
      expect(screen.getByTestId(INPUT)).toHaveAttribute(
        'placeholder',
        placeholder
      );
    });

    test('should emit onSelectDay', () => {
      const onSelectDay = jest.fn();
      render(() => <Datepicker show onSelectDay={onSelectDay} />);
      const days = screen.getAllByTestId(DAY);
      const activeDay = [...days].find(
        btn => !(btn as HTMLButtonElement).disabled
      );
      if (activeDay) {
        fireEvent.click(activeDay);
        expect(onSelectDay).toBeCalled();
      } else {
        fail('Not found active day button');
      }
    });

    test('should emit onNextMonth/onPrevMonth', () => {
      const month = dayjs();
      const onNextMonth = jest.fn();
      const onPrevMonth = jest.fn();
      render(() => (
        <Datepicker
          onNextMonth={onNextMonth}
          onPrevMonth={onPrevMonth}
          month={month}
          show
        />
      ));
      const [prev, next] = screen.getByTestId(NAV).querySelectorAll('button');
      fireEvent.click(prev);
      expect(onPrevMonth).toBeCalled();
      fireEvent.click(next);
      expect(onNextMonth).toBeCalled();
    });

    test('should emit valid prev month', () => {
      let onPrevValue!: Dayjs;
      const month = dayjs();
      render(() => (
        <Datepicker
          onPrevMonth={date => (onPrevValue = date)}
          month={month}
          show
        />
      ));

      const [prev] = screen.getByTestId(NAV).querySelectorAll('button');

      for (let i = 1; i <= 12; i++) {
        fireEvent.click(prev);
        const prevMonth = month.subtract(i, 'month');
        expect(onPrevValue.get('month')).toBe(prevMonth.get('month'));
      }
    });

    test('should emit valid next month', () => {
      let onNextValue!: Dayjs;
      const month = dayjs();
      render(() => (
        <Datepicker
          onNextMonth={date => (onNextValue = date)}
          month={month}
          show
        />
      ));
      const [, next] = screen.getByTestId(NAV).querySelectorAll('button');

      for (let i = 1; i <= 12; i++) {
        fireEvent.click(next);
        const nextMonth = month.add(i, 'month');
        expect(onNextValue.get('month')).toBe(nextMonth.get('month'));
      }
    });

    test('should set value to input', () => {
      const month = dayjs();
      render(() => <Datepicker value={month} />);

      expect(screen.getByTestId(INPUT)).toHaveValue(
        month.format(DEFAULT_FORMAT)
      );
    });

    test('should render days', () => {
      const month = dayjs();
      for (let i = 1; i <= 12; i++) {
        const nextMonth = month.add(i, 'month');
        render(() => <Datepicker month={nextMonth} show />);

        const days = screen.getAllByTestId(DAY);
        const daysFromMonth = [...days].filter(
          day => !(day as HTMLButtonElement).disabled
        );
        expect(daysFromMonth).toHaveLength(nextMonth.daysInMonth());
        cleanup();
      }
    });

    test('should set checked day & update input value', () => {
      let checkedDay: any;
      const month = dayjs().startOf('month');
      render(() => (
        <Datepicker onSelectDay={d => (checkedDay = d)} month={month} show />
      ));

      const days = screen.getAllByTestId(DAY);
      [...days].forEach(day => {
        const btn = day as HTMLButtonElement;
        if (!btn.disabled) {
          const dayIndex = parseInt(btn.innerHTML);
          fireEvent.click(btn);
          const shouldBeDate = month.add(dayIndex - 1, 'day');
          expect(toISOString(checkedDay)).toBe(toISOString(shouldBeDate));
          expect(screen.getByTestId(INPUT)).toHaveValue(
            shouldBeDate.format(DEFAULT_FORMAT)
          );
        }
      });
    });

    test('should set date by Input', () => {
      const month = dayjs();
      render(() => <Datepicker show />);

      const input = screen.getByTestId(INPUT) as HTMLInputElement;

      for (let i = 0; i < 20; i++) {
        const value = month.add(i, 'day');
        input.value = value.format(DEFAULT_FORMAT);
        fireEvent.change(input);
        const button = screen.getByText(value.format('D'), {
          selector: 'button:not([disabled])',
        });
        expect(button).toHaveClass(DayBaseClasses.selected);
        expect(screen.getByText(value.year())).toBeInTheDocument();
        expect(screen.getByText(value.format('MMMM'))).toBeInTheDocument();
      }
    });
  });

  describe('Nav', () => {
    test('should be rendered', () => {
      render(() => <DatepickerNav month={dayjs()} />);
      expect(screen.getByTestId(NAV)).toBeInTheDocument();
    });

    test('should show valid month label', () => {
      const date = dayjs();
      for (let i = 0; i < 12; i++) {
        const month = date.add(i, 'month');
        render(() => <DatepickerNav month={month} />);
        expect(screen.getByTestId(NAV_MONTH_LABEL)).toHaveTextContent(
          month.format('MMMM')
        );
        cleanup();
      }
    });

    test('should show valid year label', () => {
      const date = dayjs();
      for (let i = 0; i < 12; i++) {
        const month = date.add(i, 'year');
        render(() => <DatepickerNav month={month} />);
        expect(screen.getByTestId(NAV_YEAR_LABEL)).toHaveTextContent(
          month.format('YYYY')
        );
        cleanup();
      }
    });

    test('should emit onNextMonth', () => {
      const onNext = jest.fn();
      render(() => <DatepickerNav month={dayjs()} onNext={onNext} />);
      const [, next] = screen.getAllByTestId('button');
      fireEvent.click(next);
      expect(onNext).toBeCalled();
    });

    test('should emit onPrevMonth', () => {
      const onPrev = jest.fn();
      render(() => <DatepickerNav month={dayjs()} onPrev={onPrev} />);
      const [prev] = screen.getAllByTestId('button');
      fireEvent.click(prev);
      expect(onPrev).toBeCalled();
    });
  });

  describe('Day', () => {
    test('should be rendered', () => {
      render(() => <DayBase />);
      expect(screen.getByTestId(DAY)).toBeInTheDocument();
    });

    test('should be today', () => {
      render(() => <DayBase today />);
      expect(screen.getByTestId(DAY)).toHaveClass(DayBaseClasses.today);
    });

    test('should be selected', () => {
      render(() => <DayBase selected />);
      expect(screen.getByTestId(DAY)).toHaveClass(DayBaseClasses.selected);
    });

    test('should be holiday', () => {
      render(() => <DayBase holiday />);
      expect(screen.getByTestId(DAY)).toHaveClass(DayBaseClasses.holiday);
    });

    test('should be today class more important then holiday', () => {
      render(() => <DayBase holiday today />);
      expect(screen.getByTestId(DAY)).not.toHaveClass(DayBaseClasses.holiday);
      expect(screen.getByTestId(DAY)).toHaveClass(DayBaseClasses.today);
    });

    test('should be selected class be the most important', () => {
      render(() => <DayBase today holiday selected />);
      expect(screen.getByTestId(DAY)).not.toHaveClass(DayBaseClasses.today);
      expect(screen.getByTestId(DAY)).not.toHaveClass(DayBaseClasses.holiday);
      expect(screen.getByTestId(DAY)).toHaveClass(DayBaseClasses.selected);
    });
  });
});
