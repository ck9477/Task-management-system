import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription, tap } from 'rxjs';
import { NavbarService } from '../services/navbar.service';
import { CheckHttpService } from '../services/http/check-http.service';

@Component({
  selector: 'app-main',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  router = inject(Router);
  navbarService = inject(NavbarService);
  connection = inject(CheckHttpService);
  buttons: any;
  dataSubscription: Subscription | undefined;
  isServerAlive: boolean | null = false;
  mobileOpen = false;

  ngOnInit(): void {
    this.dataSubscription = this.navbarService.nav$.subscribe(data => {
      this.buttons = data.buttons;
    });
    setInterval(() => {
      this.connection.check$().pipe(
        tap((result) => this.isServerAlive = !!result)
      ).subscribe(
        (_ => { }),
        (_ => { })
      );
    }, 2000);

    this.goToComponent('tasks');
  }

  goToComponent(child: string) {
    if (child === 'home') {
      this.router.navigate(['/']);
      return;
    }
    const path = this.navbarService.getCurrentNavbar('main', child);
    this.router.navigate([path]);
  }

  navigate(child: string): void {
    this.goToComponent(child);
  }

  changeUser() {
    localStorage.setItem('user', '');
    this.router.navigate(['/login']);
  }
}
