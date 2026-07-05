import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { StatusMode } from '../model/statusMode';
import { ITask } from '../model/task';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { TaskViewMode } from '../model/taskViewMode';
import { MatIconModule } from '@angular/material/icon';
import { StatusTextPipe } from '../pipes/status-text.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterStatusPipe } from '../pipes/filter-status.pipe';
import { TasksTableComponent } from '../tasks-table/tasks-table.component';
import { FormsModule } from '@angular/forms'; 
import { TasksDashboardComponent } from '../tasks-dashboard/tasks-dashboard.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TasksService } from '../services/http/tasks.service';
import { map, NEVER, Observable, tap } from 'rxjs';
import { ChatComponent } from '../chat/chat.component';
import { ConfigurationService } from '../services/configuration.service';
import {MatBadgeModule} from '@angular/material/badge';
import { TasksToolTipComponent } from '../tasks-tool-tip/tasks-tool-tip.component';


@Component({
  selector: 'app-tasks',
  imports: [
    CommonModule,
    FormsModule,
    TaskComponent,
    MatIconModule,
    StatusTextPipe,
    FilterStatusPipe,
    MatSelectModule,
    MatFormFieldModule,
    TasksTableComponent,
    TasksDashboardComponent,
    ChatComponent,
    MatBadgeModule,
    TasksToolTipComponent
  ],
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TasksComponent implements OnInit, AfterViewInit{
 
  private configurationService = inject(ConfigurationService);
  private dialog = inject(MatDialog);
  private dialogRef: MatDialogRef<TaskFormComponent> | null = null;
  tasksService = inject(TasksService); 
  viewState: TaskViewMode = TaskViewMode.Dashboard;
  theStateEnum = TaskViewMode;
  theStatusEnum= StatusMode;
  errorSrc = '/error.jpg';
  errorMessage = `Server error.`;
  importantMessageDate = '';
  TasksThatEnd : string[] =[];
  tasksList$ :Observable<ITask[]> = NEVER;
  selectedStatus = StatusMode.all;
  statusList = Object.keys(StatusMode)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
      value:StatusMode[key as keyof typeof StatusMode]
    }));
   @ViewChild(ChatComponent ) myChatRef  : ChatComponent = {} as ChatComponent ;  
 
  ngOnInit(): void {
 
  }

   ngAfterViewInit(): void {
     this.loadTasks();
    this.configurationService.messageEvent.subscribe(
      (data: string) => this.showMessage(JSON.parse(data)));
    this.configurationService.importantEvent.subscribe(
        (data: string) => this.showImportantMessage(JSON.parse(data)));
  }
  

  showMessage(userMessage: {userName:string, message: string}){
    const {userName, message} = userMessage
    this.myChatRef.addMessage(userName, message);
  }

  showImportantMessage(serverMessage:{name: string, date:string}){
    if(!this.myChatRef){
      return;
    }
    const {name, date} = serverMessage;
    if(date !== this.importantMessageDate){
      this.TasksThatEnd = [];
      this.importantMessageDate = date;
    }
    if(!this.TasksThatEnd.includes(name)){
      this.TasksThatEnd= [...this.TasksThatEnd, name];
      this.myChatRef.addMessage('מנהל המשימות',`💥משימה && ${name} && חייבת להסתיים היום!`);
    }
  }

  loadTasks(){
     this.tasksList$ = this.tasksService.getTasks$().pipe(
      map(tasks => tasks || []), 
    );
  }

  changeViewState() {
    this.viewState = this.viewState === TaskViewMode.Table ? TaskViewMode.Dashboard : TaskViewMode.Table
  }

  addTask(){
    this.dialogRef = this.dialog.open(TaskFormComponent, {
      width: '520px',
      disableClose: false,
        data: { task: null }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);
      this.loadTasks();
      this.dialogRef = null; // אחרי הסגירה מאפסים את ההפניה
    });
  }

 
} 
 


 
 