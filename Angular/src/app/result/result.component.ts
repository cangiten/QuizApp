import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(public quizService: QuizService, private router: Router) { }

// 初期処理
  ngOnInit() {
    //受験中かどうかをチェックする
    //10件の問題に答えられた場合、受験結果を再表示する
    if (parseInt(localStorage.getItem('qnProgress')) == 10) {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.qns = JSON.parse(localStorage.getItem('qns'));

      this.quizService.getAnswers().subscribe(
        (data: any) => {
          this.quizService.correctAnswerCount = 0;
          this.quizService.qns.forEach((e, i) => {
            if (e.answer == data.answers[i])
              this.quizService.correctAnswerCount++;
            e.correct = data.answers[i];
          });
        }
      );
    }
    else
      //10件の問題に至ってない場合、次の問題に進めるように受験画面に遷移する
      this.router.navigate(['/quiz']);
  }

  clearLocalStorage(){
    localStorage.setItem('qnProgress', "0");
    localStorage.setItem('qns', "");
    localStorage.setItem('seconds', "0");
  }


  //受験結果を登録する
  OnSubmit() {
    this.quizService.submitScore().subscribe(() => {
      this.clearLocalStorage();
      this.router.navigate(['/profile']);
    });
  }

  //受験データクリア
  restart() {
    this.clearLocalStorage();
    this.router.navigate(['/quiz']);
  }

}
