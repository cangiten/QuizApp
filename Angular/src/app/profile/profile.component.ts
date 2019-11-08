import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService, Test } from '../shared/quiz.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  results = [];
  userId:number
  constructor(private router: Router, public quizService: QuizService) { }

  //初期処理
  ngOnInit() {
    if (this.quizService.isLoggedIn()){
      this.quizService.getProfile().subscribe(
        (data: any) => {
          localStorage.setItem('UserInfo', JSON.stringify(data.user));
          this.userId = data.user.id
          this.results = data.user.tests;
        }
      );
    }else
    {
      this.router.navigate(['/login']);
    }
  }

  startQuiz(){
    const test:Test = { user_id: this.userId, score: 0, timeSpent: 0}
    localStorage.setItem('test', JSON.stringify(test));
    this.router.navigate(['/quiz']);
  }

}
