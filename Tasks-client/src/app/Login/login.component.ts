import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/http/auth.service';
import { tap } from 'rxjs';
import { SnackService } from '../services/snack.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  implements OnInit  {
  snack  = inject(SnackService)
  router = inject(Router); 
  auth = inject(AuthService); 
  mouseoverLogin: boolean = false;
 
  formGroup: FormGroup = {}  as FormGroup;

  constructor( private formBuilder: FormBuilder) { }


  ngOnInit() {
   
    this.formGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
     const { userName, password } = this.formGroup.value;
     this.auth.login$({userName, password}).pipe(
      tap((user) =>{ 
        if(user){
          const  { password, ...rest} = user;
          localStorage.setItem('user', JSON.stringify(rest));
          this.router.navigate(['/main']);
        } else{
           this.snack.openSnackBar('לוגין נכשל', 'בדוק תקינות של שם משתמש או סיסמא')
        }
      })).subscribe();
   
    
  }
 

}

