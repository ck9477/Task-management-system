import { Component, Input } from '@angular/core';
import { ITask } from '../model/task';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { StatusMode } from '../model/statusMode';

@Component({
  selector: 'app-tasks-dashboard',
  imports: [   
    CommonModule,
    TaskComponent
  ],
  templateUrl: './tasks-dashboard.component.html',
  styleUrl: './tasks-dashboard.component.scss'
})
export class TasksDashboardComponent {
    @Input() tasksList :ITask[] | null= [];
    theStatusEnum= StatusMode;
}
