import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../model/task';
import { StatusMode } from '../model/statusMode';

@Pipe({  name: 'filterStatus'})
export class FilterStatusPipe implements PipeTransform {

  transform(tasks: ITask[] | null, statusMode:StatusMode):  ITask[] | null{
    if((!statusMode && statusMode != 0) || statusMode === StatusMode.all ){
      return tasks ? tasks : [];
    }
    return (tasks || []).filter(({status})=> status ===statusMode);
  }

}
