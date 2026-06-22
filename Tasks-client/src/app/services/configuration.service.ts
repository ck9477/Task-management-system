import { EventEmitter, inject, Injectable } from '@angular/core';
import { combineLatest, Observable, firstValueFrom, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IpConfig } from '../model/ip-config';
import { SettingsConfig } from '../model/settings';
import { WebsocketService } from './http/web-socket.service';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  ips: IpConfig = {} as IpConfig;
  settingConfig: SettingsConfig = {} as SettingsConfig;
  http = inject(HttpClient);
  messageEvent = new EventEmitter<string>();
  importantEvent = new EventEmitter<string>();
  private websocketService = inject(WebsocketService);

  initConfiguration(path:string): Promise<any> {
    return firstValueFrom(
      combineLatest([
        this.http.get<IpConfig>(`${path}/ipConfig.json`).pipe(
          catchError(() => of({ webSocketPath: '' } as IpConfig))
        ),
        this.http.get<SettingsConfig>(`${path}/settingsConfig.json`).pipe(
          catchError(() => of({} as SettingsConfig))
        )
      ]).pipe(
        tap(response => console.log('Configuration loaded:', response)),
        tap(response => [this.ips, this.settingConfig] = response),
        tap(() => this.initWS())
      )
    ).catch((error) => {
      console.error('Configuration initialization failed:', error);
      this.ips = { webSocketPath: '' } as IpConfig;
      this.settingConfig = {} as SettingsConfig;
      return Promise.resolve();
    });
  }

    initWS(){
      const wsUrl = this.ips.webSocketPath;
      if (!wsUrl) {
        console.warn('WebSocket URL not configured, skipping WS initialization.');
        return;
      }

      try {
        this.websocketService.init(wsUrl);
        this.websocketService.messages
          .subscribe((msg) => {
            if (msg.topic === 'message') {
              this.messageEvent.emit(msg.data);
              console.log('Response from websocket: ', msg);
            }
            if (msg.topic === 'important') {
              this.importantEvent.emit(msg.data);
              console.log('Response from websocket: ', msg);
            }
          });
      } catch (error) {
        console.error('WebSocket initialization failed:', error);
      }
    }
}
