import { cleanup, fireEvent, render, screen } from 'solid-testing-library';
import { Datepicker, DatepickerSelectors } from '../Datepicker';
import { InputSelectors } from '../../input';
import dayjs, { Dayjs } from 'dayjs';

const {DATEPICKER, NAV, MONTH} = DatepickerSelectors;
const {INPUT} = InputSelectors;
const DEFAULT_FORMAT = 'YYYY.MM.DD';

const toISOString = (date: Dayjs) => date.toDate().toISOString();

describe('Datepicker', () => {

    test('should be rendered', () => {
        render(() => <Datepicker/>);
        expect(screen.queryByTestId(INPUT)).toBeInTheDocument();
    });

    test('should be opened with props', () => {
        render(() => <Datepicker show/>);
        expect(screen.queryByTestId(DATEPICKER)).toBeInTheDocument();
    });

    test('should be opened by click on Input', () => {
        render(() => <Datepicker/>);
        expect(screen.queryByTestId(DATEPICKER)).not.toBeInTheDocument();
        fireEvent.click(screen.getByTestId(INPUT));
        expect(screen.queryByTestId(DATEPICKER)).toBeInTheDocument();
    });

    test('should emit onOpen', () => {
        const onOpen = jest.fn();
        render(() => <Datepicker onOpen={onOpen}/>);
        fireEvent.click(screen.getByTestId(INPUT));
        expect(onOpen).toBeCalled();
    });

    test('should emit onClose', () => {
        const onClose = jest.fn();
        render(() => <Datepicker show onClose={onClose}/>);
        fireEvent.click(document.body);
        expect(onClose).toBeCalled();
    });

    test('should set placeholder to input', () => {
        const placeholder = 'placeholder';
        render(() => <Datepicker placeholder={placeholder}/>);
        expect(screen.getByTestId(INPUT)).toHaveAttribute('placeholder', placeholder);
    });

    test('should emit onSelectDay', () => {
        const onSelectDay = jest.fn();
        render(() => <Datepicker show onSelectDay={onSelectDay}/>);
        const days = screen.getByTestId(MONTH).querySelectorAll('button.day');
        const activeDay = [...days].find(btn => !(btn as HTMLButtonElement).disabled);
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
        let onPrevValue: any = null;
        const month = dayjs();
        render(() => (
            <Datepicker
                onPrevMonth={date => onPrevValue = date}
                month={month}
                show
            />
        ));

        const toISOString = (date: Dayjs) => date.toDate().toISOString();
        const [prev] = screen.getByTestId(NAV).querySelectorAll('button');

        for (let i = 1; i <= 12; i++) {
            fireEvent.click(prev);
            const prevMonth = month.subtract(i, 'month');
            expect(toISOString(onPrevValue)).toBe(toISOString(prevMonth));
        }
    });

    test('should emit valid next month', () => {
        let onNextValue: any = null;
        const month = dayjs();
        render(() => (
            <Datepicker
                onNextMonth={date => onNextValue = date}
                month={month}
                show
            />
        ));
        const [, next] = screen.getByTestId(NAV).querySelectorAll('button');

        for (let i = 1; i <= 12; i++) {
            fireEvent.click(next);
            const prevMonth = month.add(i, 'month');
            expect(toISOString(onNextValue)).toBe(toISOString(prevMonth));
        }
    });

    test('should set value to input', () => {
        const month = dayjs();
        render(() => (
            <Datepicker
                value={month}
            />
        ));

        expect(screen.getByTestId(INPUT)).toHaveValue(month.format(DEFAULT_FORMAT));
    });

    test('should render days', () => {
        const month = dayjs();
        for (let i = 1; i <= 12; i++) {
            const nextMonth = month.add(i, 'month');
            render(() => (
                <Datepicker
                    month={nextMonth}
                    show
                />
            ));

            const days = screen.getByTestId(MONTH).querySelectorAll('button.day');
            const daysFromMonth = [...days].filter(day => !(day as HTMLButtonElement).disabled);
            expect(daysFromMonth).toHaveLength(nextMonth.daysInMonth());
            cleanup();
        }
    });

    test('should set checked day & update input value', () => {
        let checkedDay: any;
        const month = dayjs().startOf('month');
        render(() => (
            <Datepicker
                onSelectDay={d => checkedDay = d}
                month={month}
                show
            />
        ));

        const days = screen.getByTestId(MONTH).querySelectorAll('button.day');
        [...days].forEach(day => {
            const btn = day as HTMLButtonElement;
            if (!btn.disabled) {
                const dayIndex = parseInt(btn.innerHTML);
                fireEvent.click(btn);
                const shouldBeDate = month.add(dayIndex - 1, 'day');
                expect(toISOString(checkedDay)).toBe(toISOString(shouldBeDate));
                expect(screen.getByTestId(INPUT)).toHaveValue(shouldBeDate.format(DEFAULT_FORMAT));
            }
        });
    });

    test('should set date by Input', () => {
        const month = dayjs();
        render(() => (
            <Datepicker
                show
            />
        ));

        const input = screen.getByTestId(INPUT) as HTMLInputElement;

        for (let i = 0; i < 20; i++) {
            const value = month.add(i, 'day');
            input.value = value.format(DEFAULT_FORMAT);
            fireEvent.change(input);
            const button = screen.getByText(value.format('D'), {selector: 'button:not([disabled])'});
            expect(button).toHaveClass('btn-primary');
            expect(screen.getByText(value.year())).toBeInTheDocument();
            expect(screen.getByText(value.format('MMMM'))).toBeInTheDocument();
        }
    });
});
