import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../model/user';

@Injectable({ providedIn: 'root' })
export class LoggedInGuardService implements CanActivate {


    constructor(private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
        
        const isLoggedIn = this.checkUserInLocalStorage();
        if (!isLoggedIn) {
            this.router.navigate(['/login']);
            return false;
        } else {
            
         }
        return isLoggedIn;

    }
    checkUserInLocalStorage(): boolean {
        const userJson = localStorage.getItem('user');
        let isValid = false;
        if (!userJson) {
            return false; // לא קיים בכלל
        }
        try {
            const user:IUser = JSON.parse(userJson);
            // בדיקה האם האובייקט מכיל את השדות name ו-
            if (user && typeof user === 'object' && 'userName' in user && 'roleId' in user) {
            // אפשר גם לבדוק אם הם מחרוזות:
                if (typeof user.userName === 'string' && typeof user.roleId === 'number') {
                    isValid = true;
                }      
            }
        } catch (e) {
            console.error('Invalid JSON in localStorage for key "user"', e);
            return isValid;
        }

        return isValid;
    }

}

