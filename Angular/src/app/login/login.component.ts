import { Component, OnInit } from '@angular/core';
import { QuizService, JsonToken } from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   //Eメール検証パターン
   emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
   errorMessage:string;
   constructor(private quizService : QuizService,private route : Router) { }
 
   //初期処理
   ngOnInit() {
    if (this.quizService.isLoggedIn()){
      this.route.navigate(['/profile']);
    }
   }
 
   //ログインボタン押下時の発生イベント
   //受験者情報の登録に成功した後、ブラウザのローカルストレージに受験者を保存する。
   OnSubmit(email:string,password:string){
     this.quizService.login(email,password).subscribe(
       (data : JsonToken) =>{
        this.quizService.saveToken(data.token);
        console.log(this.quizService.getUserDetail())
         this.route.navigate(['/profile']);
       },
       error => {
         console.log(error);
        this.errorMessage = error.error;
    }
     );
   }

}
