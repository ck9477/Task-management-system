import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../model/task';
import { StatusMode } from '../model/statusMode';
import { CommonModule } from '@angular/common';
import { RandomColorPipe } from '../pipes/random-color.pipe';
import { MatIconModule } from '@angular/material/icon';
import { StatusIconPipe } from '../pipes/status-icon.pipe';
import { StatusTextPipe } from '../pipes/status-text.pipe';

@Component({
  selector: 'app-task',
  imports: [CommonModule,
    RandomColorPipe,
    MatIconModule,
    StatusIconPipe,
    StatusTextPipe
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit{
 
  @Input() task: ITask = {} as ITask;
  theStatusEnum= StatusMode;

   ngOnInit(): void {
    const i=0
  }
}
