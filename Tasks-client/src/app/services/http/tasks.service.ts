import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestModel } from '../../model/http-request.model';
import { HttpServiceBase } from './http-service.base';
import { ITask } from '../../model/task';

@Injectable({  providedIn: 'root'})
export class TasksService extends HttpServiceBase {

   private get _serverUrl(): string {
      return `${this.config.ips.servicePath}tasks/`;
   }

   getTasks$(): Observable<ITask[]> {
       return this.get$<ITask[]>(new HttpRequestModel({
        url: this._serverUrl,
        action: 'getTasks',
      }));
    }

    addTask$(task: ITask): Observable<Boolean>{
      return this.post$<Boolean>(new HttpRequestModel({
        url: this._serverUrl,
        action: 'addtask',
        body:task
      }));
    }

    updateTask$(task: ITask): Observable<Boolean>{
      return this.put$<Boolean>(new HttpRequestModel({
        url: this._serverUrl,
        action: 'updateTask',
        body:task
      }));
    }

     deleteTask$(taskId: number): Observable<Boolean>{
      return this.delete$<Boolean>(new HttpRequestModel({
        url: this._serverUrl,
        action: 'deleteTask',
        params:{taskId}
      }));
    }
}
