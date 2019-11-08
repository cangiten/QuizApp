import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public quizService : QuizService, private router: Router) { }
  canActivate(): boolean {
    if (this.quizService.isLoggedIn())
      return true;
    this.router.navigate(['/']);
    return false;
  }
}
