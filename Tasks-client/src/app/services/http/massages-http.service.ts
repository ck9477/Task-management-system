import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestModel } from './../model/http-request.model';
import { HttpServiceBase } from './http-service.base';

@Injectable({  providedIn: 'root'})
export class MessagesHttpService extends HttpServiceBase {
  
  private get _serverUrl(): string {
    return `${this.config.ips.servicePath}massages/`;
  }

  messages$(): Observable<boolean> {
   
   return this.get$(new HttpRequestModel({
      url: this._serverUrl,
      action: 'send-massages',
      params: {times:this.config.settings.numMessages}
    }));
  }

}
