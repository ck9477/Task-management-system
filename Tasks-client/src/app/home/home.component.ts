import {Component, inject, OnInit} from '@angular/core';
import { DownloadService } from '../services/download.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CopyToClipboardDirective } from '../directives/copy-to-clipboard.directive';
import { IHomeDetails } from '../model/homeData';

@Component({
  standalone: true,
  selector: 'app-home',
   imports:[
    CommonModule,  
    RouterModule,
    CopyToClipboardDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  router = inject(Router); 
  download = inject( DownloadService); 
  homeDetails:IHomeDetails = {
      name:   'חני ',  
      profession:  'מתכנתת פולסטאק',
      description: 'אני מתמחה בפיתוח אתרי אינטרנט ואפליקציות, עם ניסיון ב-Frontend וב-Backend. אשמח לעזור לך לבנות את הפרויקט הבא שלך!',
      contactEmail:'chanik9477@gmail.com',
      techStack: ['Angular 19', 'Node.js', 'TypeScript', 'Pyton', 'SQL', 'HTML', 'CSS', 'C++', 'Git','C#','React','Aws'],
      meName:'  חני  ',
      meTitle: ' מתכנתת פולסטאק ',
      meDescription : 'אני בונה אפליקציות מודרניות, אתרים מדהימים, מערכות חכמות – ומשלבת בין עיצוב מדויק לקוד איכותי.',
     
    }


        ngOnInit(): void {
        
        
        }
    openCV(){
      this.download.downloadCv().subscribe(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'cv.pdf'; // ✅ Set desired file name
            a.click();
            window.URL.revokeObjectURL(url); // clean up
      });
    }

    gotoTasks(){
         this.router.navigate(['/main']);
    }

  
  }