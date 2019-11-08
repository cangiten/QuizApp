import {Routes} from '@angular/router'
import { RegisterComponent } from './register/register.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth/auth.guard';



export const appRoutes : Routes = [
    {path:'register', component: RegisterComponent},
    {path:'login', component: LoginComponent},
    {path:'profile', component: ProfileComponent},
    {path:'quiz', component:QuizComponent, canActivate:[AuthGuard]},
    {path:'result', component:ResultComponent},
    {path:'', redirectTo:'/profile', pathMatch:'full'}
];