import { Dayjs } from 'dayjs';
import { Component } from 'solid-js';
import { Button } from '../../../actions';
import { DatepickerSelectors } from '../Datepicker';


type CalendarNavProps = {
    month: Dayjs;
    onPrev: () => void;
    onNext: () => void;
}

export const DatepickerNav: Component<CalendarNavProps> = (props) => {

    return (
        <nav
            data-testid={DatepickerSelectors.DATEPICKER_NAV}
            class="navbar flex justify-between items-center p-1 pt-2"
        >
            <Button
                size="sm"
                color="ghost"
                class="h-full"
                square
                onClick={props.onPrev}
            >
                <i class="fas fa-angle-left text-lg"/>
            </Button>
            <div class="text-lg font-semibold px-1 flex flex-col w-28 items-center">
                <span class="leading-none">{props.month.format('MMMM')}</span>
                <span class="text-xs font-normal">{props.month.format('YYYY')}</span>
            </div>
            <Button
                size="sm"
                color="ghost"
                onClick={props.onNext}
            >
                <i class="fas fa-angle-right text-lg"/>
            </Button>
        </nav>
    );
};
