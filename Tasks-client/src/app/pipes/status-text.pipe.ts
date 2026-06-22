import { Pipe, PipeTransform } from '@angular/core';
import { StatusMode } from '../model/statusMode';

@Pipe({  name: 'statusText'})
export class StatusTextPipe implements PipeTransform {

  transform(status: StatusMode): string {
     switch (status) {
       case StatusMode.pending:
         return 'ממתין';
       case StatusMode.process:
         return 'בתהליך';
       case StatusMode.completed:
         return 'בוצע';
       case StatusMode.cancel:
         return 'בוטל';
         case StatusMode.all:
          return 'הכל';
     }
     return '';
   }
 

}
