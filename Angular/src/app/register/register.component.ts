import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //Eメール検証パターン
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private quizService : QuizService,private route : Router) { }

  //初期処理
  ngOnInit() {
  }

  //登録ボタン押下時の発生イベント
  //受験者情報の登録に成功した後、サーバから受け取ったトークンをローカルストレージに保存する。
  OnSubmit(name:string,email:string,password:string){
    this.quizService.register(name,email,password).subscribe(
      (data : any) =>{
        this.quizService.saveToken(data['token']);
        this.route.navigate(['/profile']);
      },
      error => {
       console.log(error);
   }
    );
  }

}
