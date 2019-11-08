import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface UserDetail {
  id: number,
  name: string,
  email: string,
  password: string,
  exp: number,
  iat: number
}

export interface Test {
  user_id: number,
  score: number,
  timeSpent: number
}

export interface JsonToken {
  token: string
}

@Injectable()
export class QuizService {
  //---------------- プロパティ定義---------------
  //サーバーAPIのURL
  readonly apiUrl = 'http://localhost:8000';
  //内部変数
  qns: any[];
  seconds: number;
  timer: any;
  qnProgress: number;
  correctAnswerCount: number = 0;
  userName: string;

  //---------------- コンストラクタ処理---------------
  constructor(private http: HttpClient) { }
  //受験経過時間表示
  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }

  //受験者名を取得する
  getUserName() {
    const userInfo = JSON.parse(localStorage.getItem('UserInfo'));
    return userInfo.name;
  }

  saveToken(token: string) {
    localStorage.setItem('usertoken', token);
  }

  getToken(): string {
    return localStorage.getItem('usertoken');
  }

  //JWTトークンからペイロードデータを抽出する
  getUserDetail(): UserDetail {
    const token = this.getToken();
    let payload
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  //認証確認(ログイン済みチェック)
  isLoggedIn(): boolean {
    const user = this.getUserDetail();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }


  //---------------- イベント---------------

  //受験者情報データを登録する
  register(name: string, email: string, password: string) {
    let body = {
      name: name,
      email: email,
      password: password
    }
    return this.http.post(this.apiUrl + '/api/register', body,
      {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }//'Content-Type': 'application/json' }
      });
  }

  //ログイン
  login(email: string, password: string) {
    let body = {
      email: email,
      password: password
    }
    const base = this.http.post(this.apiUrl + '/api/login', body,
      {
        headers: { 'Content-Type': 'application/json' }
      });

    const request = base.pipe(
      map((data: JsonToken) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    )
    return request;
  }

  //会員情報取得
  getProfile() {
    return this.http.get(this.apiUrl + '/api/profile',
      {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
  }

  //質問一覧データを取得する
  getQuestions() {
    return this.http.get(this.apiUrl + '/api/questions',
      {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
  }

  //質問番号により該当する答えを取得する
  getAnswers() {
    var body = this.qns.map(x => x.QnID);
    return this.http.post(this.apiUrl + '/api/answers', body,
      {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
  }

  //受験結果を登録する
  submitScore() {
    var body = JSON.parse(localStorage.getItem('test'));
    body.score = this.correctAnswerCount;
    body.timeSpent = this.seconds;
    return this.http.post(this.apiUrl + "/api/tests", body,
      {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
  }

}
