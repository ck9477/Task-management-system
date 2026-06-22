import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  http = inject(HttpClient); 

  constructor() { }

  
  downloadCv() {
    const filePath = encodeURI('/CV/chani.pdf');
    return this.http.get(filePath, { responseType: 'blob' });
  }
   
}
