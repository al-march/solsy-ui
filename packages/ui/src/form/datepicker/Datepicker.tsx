import { Component, createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Input, InputColor, InputSize } from '../input';
import { DatepickerNav, Month } from './base';
import { Popover } from '../../data-display';
import dayjs, { Dayjs } from 'dayjs';
import { Placement } from '@popperjs/core';

import isoWeek from 'dayjs/plugin/isoWeek';
import weekday from 'dayjs/plugin/weekday';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.extend(localizedFormat);

export const DatepickerSelectors = {
    DATEPICKER: 'datepicker',
    NAV: 'nav',
    NAV_MONTH_LABEL: 'month-label',
    NAV_YEAR_LABEL: 'year-label',
    MONTH: 'month',
    DAY: 'day'
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
    value?: string | number | Dayjs | Date;
    month?: Dayjs;
    onNextMonth?: (month: Dayjs) => void;
    onPrevMonth?: (month: Dayjs) => void;
    onSelectDay?: (day: Dayjs) => void;
    onOpen?: () => void;
    onClose?: () => void;

    placeholder?: string;
    color?: InputColor;
    size?: InputSize;
    class?: string;
    bordered?: boolean;
    error?: boolean;

    placement?: Placement;
    weekHolidays?: number[];
    closeOnSelect?: boolean;
}

export const Datepicker: Component<DatepickerProps> = (props) => {

    const [state, setState] = createStore<DatepickerState>({
        _show: !!props.show,
        _selected: props.value ? dayjs(props.value) : undefined,
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
        if (!state.show) {
            setState('_show', true);
            props.onOpen?.();
        }
    };

    const close = () => {
        if (state.show) {
            setState('_show', false);
            props.onClose?.();
        }
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

    const onInput = (value: string) => {
        const date = dayjs(value);
        const format = date.format('YYYY.MM.DD');

        if (format !== 'Invalid Date') {
            setState('_selected', date);
            setState('_month', date);
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
                placement={props.placement}

                trigger={
                    <Input
                        placeholder={props.placeholder}
                        size={props.size}
                        color={props.color}
                        class={props.class}
                        error={props.error}
                        bordered={props.bordered}

                        value={state.selected?.format('YYYY.MM.DD')}

                        onChange={e => onInput(e.currentTarget.value)}
                        onFocus={() => open()}
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
