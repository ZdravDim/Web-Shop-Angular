import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [DatePickerComponent, MatDatepickerModule, MatFormFieldModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent {

  protected dateFrom: Date | null = null;
  protected dateTo: Date | null = null;

  dateInputEvent(startDate: boolean, event: MatDatepickerInputEvent<Date>) {
    if (startDate) {
      this.dateFrom = new Date(event.value!);
    } else {
      this.dateTo = new Date(event.value!);
    }
  }

  public getDateFrom(): Date | null {
    return this.dateFrom;
  }
  
  public getDateTo(): Date | null {
    return this.dateTo;
  }

}
