import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['/auth/login']);
            return false;
        }
        return true;
    }
}
