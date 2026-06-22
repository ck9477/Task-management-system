import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterModule , RouterLink, RouterOutlet, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription, tap } from 'rxjs';
import { NavbarService } from '../services/navbar.service';
import { CheckHttpService } from '../services/http/check-http.service';
import { UserComponent } from '../user/user.component';


@Component({
  selector: 'app-main',
  imports: [
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    RouterModule,
    CommonModule, 
    RouterLink,  
    UserComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{
  router = inject(Router);
  navbarService = inject(NavbarService);
  connection = inject(CheckHttpService); 
  buttons: any;
  dataSubscription: Subscription | undefined;
  isServerAlive= false;     
  @ViewChild('about') targetElement!: ElementRef;
 

  
  ngOnInit(): void {
    
    this.dataSubscription = this.navbarService.nav$.subscribe(data => {
      this.buttons = data.buttons;
    });
    setInterval(() => {
      this.connection.check$().pipe(
        tap((result) => this.isServerAlive = !!result)
        ).subscribe(
          (_=>{}),
          (err => {})
        );
    }, 2000);
   
   this.goToComponent('tasks');
  }
  
  goToComponent(child: string) {
    if(child==='home'){
      this.router.navigate(['/']);
      return
    }
   
    const path = this.navbarService.getCurrentNavbar('main', child);
    this.router.navigate([path]);
  }


  navigate(child: string): void {
    this.goToComponent(child);
  }

  scrollToElement() {
    console.log(this.targetElement);

    const element = this.targetElement.nativeElement;
    if (element) {

      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  changeUser(){
    localStorage.setItem('user','');
    this.router.navigate(['/login']);
  }

}
