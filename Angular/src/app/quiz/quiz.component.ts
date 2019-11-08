import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private router: Router, public quizService: QuizService) { }

  //初期処理
  ngOnInit() {
    //受験が開始後の場合、ローカルストレージから受験中のデータを取得する
    if (parseInt(localStorage.getItem('seconds')) > 0) {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.qns = JSON.parse(localStorage.getItem('qns'));
      //受験が完了の場合、受験結果を表示する
      if (this.quizService.qnProgress == 10)
        this.router.navigate(['/result']);
      else
      //受験を継続にする
        this.startTimer();
    }
    else {
      //受験を開始する
      this.quizService.seconds = 0;
      this.quizService.qnProgress = 0;
      this.quizService.getQuestions().subscribe(
        (data: any) => {
          console.log(data);
          this.quizService.qns = data.questions;
          this.startTimer();
        }
      );
    }
  }

  //受験タイムを開始する
  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  }

  //表示されている質問の答えを追加する
  Answer(choice:number) {
    this.quizService.qns[this.quizService.qnProgress].answer = choice + 1;
    localStorage.setItem('qns', JSON.stringify(this.quizService.qns));
    this.quizService.qnProgress++;
    localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());
    if (this.quizService.qnProgress == 10) {
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    }
  }

}
