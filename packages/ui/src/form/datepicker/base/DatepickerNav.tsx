import { Dayjs } from 'dayjs';
import { ParentProps } from 'solid-js';
import { Button } from '../../../actions';
import { DatepickerSelectors } from '../Datepicker';


type CalendarNavProps = {
  month: Dayjs;
  onPrev?: () => void;
  onNext?: () => void;
}

export const DatepickerNav = (props: ParentProps<CalendarNavProps>) => {
  return (
    <nav
      data-testid={DatepickerSelectors.NAV}
      class="navbar flex justify-between items-center p-1 pt-2"
    >
      <Button
        size="sm"
        color="ghost"
        square
        onClick={props.onPrev}
      >
        <i class="fas fa-angle-left text-lg"/>
      </Button>
      <div class="text-lg font-semibold px-1 flex flex-1 flex-col w-28 items-center">
        <span
          data-testid={DatepickerSelectors.NAV_YEAR_LABEL}
          class="text-sm font-normal p-0 h-auto min-h-0 font-bold"
        >
          {props.month.format('YYYY')}
        </span>
        <span
          data-testid={DatepickerSelectors.NAV_MONTH_LABEL}
          class="leading-none uppercase text-sm"
        >
          {props.month.format('MMMM')}
        </span>
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
