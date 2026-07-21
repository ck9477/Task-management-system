import {Component, inject, OnInit} from '@angular/core';
import { DownloadService } from '../services/download.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CopyToClipboardDirective } from '../directives/copy-to-clipboard.directive';
import { IHomeDetails } from '../model/homeData';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    CopyToClipboardDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  router = inject(Router);
  download = inject(DownloadService);

  homeDetails: IHomeDetails = {
    name: '',
    profession: 'פיתוח תוכנה',
    description: 'אפליקציות מודרניות, אתרים מדהימים, מערכות חכמות – פיתוח Full-Stack באיכות גבוהה.',
    contactEmail: 'chanik9477@gmail.com',
    techStack: ['Angular', 'React', 'Node.js', 'TypeScript', 'Python', 'C#', 'C++', 'SQL', 'HTML', 'CSS', 'Git', 'AWS'],
    meName: 'מערכת ניהול משימות',
    meTitle: 'פיתוח תוכנה',
    meDescription: 'אפליקציות מודרניות, אתרים מדהימים, מערכות חכמות – פיתוח Full-Stack באיכות גבוהה.',
  };

  /** Map technology name to an emoji icon */
  techIcon(tech: string): string {
    const icons: Record<string, string> = {
      'Angular': '🅰️',
      'React': '⚛️',
      'Node.js': '💚',
      'TypeScript': '🔷',
      'Python': '🐍',
      'C#': '♯',
      'C++': '⚡',
      'SQL': '🗄️',
      'HTML': '🏗️',
      'CSS': '🎨',
      'Git': '🔀',
      'AWS': '☁️',
    };
    return icons[tech] || '💻';
  }

  ngOnInit(): void {}

  openCV() {
    this.download.downloadCv().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cv.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  gotoTasks() {
    this.router.navigate(['/main']);
  }
}
