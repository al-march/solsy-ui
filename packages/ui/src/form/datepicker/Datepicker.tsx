import { Component, createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Input } from '../input';
import { DatepickerNav, Month } from './base';
import { Popover } from '../../data-display';
import dayjs, { Dayjs } from 'dayjs';

import isoWeek from 'dayjs/plugin/isoWeek';
import weekday from 'dayjs/plugin/weekday';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.extend(localizedFormat);

/*
* Todo:
*  1) Add props for Input
*  2) Add tests
*  3) Bind Input with Datepicker value <=>
*/

export const DatepickerSelectors = {
    DATEPICKER: 'datepicker',
    DATEPICKER_NAV: 'nav',
    MONTH: 'month',
};

type DatepickerContext = {
    state: DatepickerState;
    onSelectDay: (day: Dayjs) => void;
    onNextMonth: (month: Dayjs) => void;
    onPrevMonth: (month: Dayjs) => void;
    close: () => void;
    open: () => void;
}

type DatepickerState = {
    _show: boolean;
    show: boolean;
    _selected?: Dayjs;
    selected?: Dayjs;
    _month: Dayjs;
    month: Dayjs;
    _weekHolidays: number[];
    weekHolidays: number[];
}

export type DatepickerProps = {
    show?: boolean;
    month?: Dayjs;
    onNextMonth?: (month: Dayjs) => void;
    onPrevMonth?: (month: Dayjs) => void;
    onSelectDay?: (day: Dayjs) => void;
    onOpen?: () => void;
    onClose?: () => void;

    weekHolidays?: number[];
    closeOnSelect?: boolean;
}

export const Datepicker: Component<DatepickerProps> = (props) => {

    const [state, setState] = createStore<DatepickerState>({
        _show: !!props.show,
        _selected: undefined,
        _month: props.month || dayjs(),
        _weekHolidays: props.weekHolidays || [],

        get show() {
            return this._show;
        },
        get selected() {
            return this._selected;
        },
        get month() {
            return this._month;
        },
        get weekHolidays() {
            return this._weekHolidays;
        }
    });

    const open = () => {
        setState('_show', true);
        props.onOpen?.();
    };

    const close = () => {
        setState('_show', false);
        props.onClose?.();
    };

    const onNextMonth = () => {
        const month = state.month.add(1, 'month');
        setState('_month', month);
        props.onNextMonth?.(month);
    };

    const onPrevMonth = () => {
        const month = state.month.subtract(1, 'month');
        setState('_month', month);
        props.onPrevMonth?.(month);
    };

    const onSelectDay = (day: Dayjs) => {
        setState('_selected', day);
        props.onSelectDay?.(day);
        if (props.closeOnSelect) {
            close();
        }
    };

    return (
        <DatepickerContext.Provider value={{
            state,
            close,
            open,
            onSelectDay,
            onNextMonth,
            onPrevMonth,
        }}>
            <Popover
                onClose={close}
                onOpen={open}
                show={state.show}

                trigger={
                    <Input
                        placeholder="date"
                        value={state.selected?.format('YYYY.MM.DD')}
                        bordered
                    />
                }>
                <div
                    data-testid={DatepickerSelectors.DATEPICKER}
                    class="shadow-xl bg-base-300 rounded-lg overflow-hidden"
                >
                    <DatepickerNav
                        month={state.month}
                        onNext={onNextMonth}
                        onPrev={onPrevMonth}
                    />

                    <Month
                        month={state.month}
                        onSelectDay={onSelectDay}
                    />
                </div>
            </Popover>
        </DatepickerContext.Provider>
    );
};

const DatepickerContext = createContext<DatepickerContext>();

export const useDatepicker = () => {
    const ctx = useContext(DatepickerContext);
    if (ctx) {
        return ctx;
    }
    throw new Error('No context for datepicker');
};
