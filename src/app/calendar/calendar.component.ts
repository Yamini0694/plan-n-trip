import {
  Component,
  TemplateRef,
  Input,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { startOfDay, isSameDay, isSameMonth, subDays, addDays } from "date-fns";
import { Subject } from "rxjs";
import {
  CalendarEvent,
  CalendarView,
  CalendarMonthViewBeforeRenderEvent,
} from "angular-calendar";
import { Trip } from "../trip";

const colors: any = {
  blue: {
    primary: "#5ab5e6",
    secondary: "#5ab5e6",
  },
};

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"],
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  @Input() tripList: Trip[];
  @Input() selectedTrip: Trip;

  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes["tripList"].currentValue.length > 0) {
      this.setCalendarEvent(changes["tripList"].currentValue);
    }
  }
  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    this.events.forEach((event) => {
      renderEvent.body.forEach((day) => {
        const dayOfMonth = day.date.getDate();
        const monthOfRender = day.date.getMonth();
        if (
          dayOfMonth == event.start.getDate() &&
          day.inMonth &&
          monthOfRender == event.start.getMonth()
        ) {
          day.cssClass = "bg-blue";
        }
      });
    });
  }

  setCalendarEvent(trips: Trip[]) {
    this.events = [];
    trips.forEach((element) => {
      let calendar = {
        start: startOfDay(new Date(element.start)),
        title:
          "Destination: " +
          element.destination +
          " ,Comments:" +
          element.comment +
          " , Duration:" +
          element.duration,
        color: colors.blue,
      };
      this.events.push(calendar);
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
}
