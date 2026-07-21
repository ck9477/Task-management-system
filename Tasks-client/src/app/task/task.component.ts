import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../model/task';
import { StatusMode } from '../model/statusMode';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { StatusIconPipe } from '../pipes/status-icon.pipe';
import { StatusTextPipe } from '../pipes/status-text.pipe';

@Component({
  selector: 'app-task',
  imports: [
    CommonModule,
    MatIconModule,
    StatusIconPipe,
    StatusTextPipe,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  @Input() task: ITask = {} as ITask;
  theStatusEnum = StatusMode;

  ngOnInit(): void {}

  /** Return CSS class for the status badge */
  statusClass(): string {
    switch (this.task.status) {
      case StatusMode.pending: return 'badge-pending';
      case StatusMode.process: return 'badge-process';
      case StatusMode.completed: return 'badge-completed';
      case StatusMode.cancel: return 'badge-cancel';
      default: return '';
    }
  }
}
