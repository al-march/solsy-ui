import { Dayjs } from 'dayjs';

export class DayModel {

  constructor(
    public date: Dayjs,
    public fromCurrentMonth: boolean,
    public isToday: boolean,
  ) {
  }

  get isWeekend() {
    return this.date.isoWeekday() === 7 || this.date.isoWeekday() === 6;
  }
}
