import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ITask } from '../model/task';
import { CommonModule } from '@angular/common';
import { StatusIconPipe } from '../pipes/status-icon.pipe';
import { StatusTextPipe } from '../pipes/status-text.pipe';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { ToColumnNamePipe } from '../pipes/to-column-name.pipe';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../services/http/tasks.service';
import { StatusMode } from '../model/statusMode';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { tap } from 'rxjs';
import { SnackService } from '../services/snack.service';

@Component({
  selector: 'app-tasks-table',
  imports: [
    CommonModule,
    StatusIconPipe,
    StatusTextPipe,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    ToColumnNamePipe
  ],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss'
})
export class TasksTableComponent  implements OnInit,  OnChanges  {
   private tasksService = inject(TasksService); 
   private dialog = inject(MatDialog);
   private dialogRef: MatDialogRef<TaskFormComponent> | null = null;
   private confirmRef: MatDialogRef<ConfirmDialogComponent> | null = null;
   private snack = inject(SnackService);
   @Input() tasksList :ITask[] | null= [];
   @Output() afterUpdate: EventEmitter<any>  = new EventEmitter ();
   columns: string[] = []; 
   notDisplayColumns = ['taskId'];
   iconColumns = ['delete','status','update'];

   ngOnInit(): void {
   }

  ngOnChanges(changes: SimpleChanges): void {
     const { tasksList }= changes;
     if(tasksList){
      if(this.tasksList && this.tasksList.length){
              this.columns =[... Object.keys(this.tasksList[0])
              .filter( key => !this.notDisplayColumns.includes(key) ), 
              'update', 'delete'];
        }
     }
  }
  isEditable(task: ITask){
    return task && (task.status === StatusMode.pending || task.status === StatusMode.process);
  }
  deleteTask({ taskId }: ITask){
    this.confirmRef = this.dialog.open(ConfirmDialogComponent, {
      width: '220px',
      disableClose: false,
        data: { message: 'האם אתה בטוח שאתה רוצה למחוק את המשימה?'}
    });

    this.confirmRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);
      if(result){
          this.deleteTaskFromList(taskId);
      } 
      
    });
  }
  deleteTaskFromList(taskId: number){
      this.tasksService.deleteTask$(taskId).pipe(
            tap((result) => this.snack.openSnackBar('מחיקה הסתיימה בהצלחה','')),
            tap(_ => this.afterUpdate.emit()),
            tap(_ => this.confirmRef = null )// אחרי הסגירה מאפסים את ההפניה
          ).subscribe(
            (_=>{}),
            (err => this.snack.openSnackBar('שגיאה במחיקת משימה',err))
        );  
  }

  updateTask(task:ITask){
    if(!this.isEditable(task)) return; // prevent opening dialog for non-editable statuses

    const allowEditInProcess = task.status === StatusMode.process;
    this.dialogRef = this.dialog.open(TaskFormComponent, {
      width: '520px',
      disableClose: false,
        data: { task, allowEditInProcess }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);
      this.afterUpdate.emit();
      this.dialogRef = null; // אחרי הסגירה מאפסים את ההפניה

    });
  }
}
