import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { StatusMode } from '../model/statusMode';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: StatusComponent,
      multi: true
    },
  ]
})
export class StatusComponent implements ControlValueAccessor {
  theStatusEnum = StatusMode;
  private _status = StatusMode.pending;
  @Input() canChangeStatus: boolean = false;
   get status() {
     return this._status;
   }
 
   @Input() set status(val) {
      this._status = val;
      this.propagateChange( this._status);
   }

   statusToString(status:StatusMode){
      switch(status){
        case StatusMode.pending:
          return 'ממתין';
          case StatusMode.process:
          return 'בתהליך';
          case StatusMode.completed:
          return 'בוצע';
          case StatusMode.cancel:
          return 'בוטל';
          default:return '';
      }
   }
   propagateChange = (_: any) => {};

   changeStatus(status: StatusMode) {
    if(this.canChangeStatus){
            this.status = status;
    }
    
   }
  
 
     //  מתודה שכותבת ערך חדש ממודל הטופס לתצוגה או (אם יש צורך) במאפיין DOM
    writeValue(value: any): void {
     if (!value) {
       this.status = StatusMode.pending;
       return;
      }
      this.status = value;
    }
 
    // מקבלת פונקציה שמתבצעת לאחר שנעשה שינוי בערך של הפקד
    registerOnChange(fn: any): void {
       this.propagateChange = fn;
    }
 
    // מקבלת פונקציה שמתבצעת לאחר שנעשה שינוי בערך של הפקד שנעשה ע"י מגע(במסך מגע)
    registerOnTouched(fn: any): void {
    }
 
    setDisabledState?(isDisabled: boolean): void {
     // this.disabled = isDisabled;
    }
}
