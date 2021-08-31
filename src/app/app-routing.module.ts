import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CreateAthleteComponent} from './create-athlete/create-athlete.component';
import {LoginComponent} from './login/login.component';
import {AthleteComponent} from './athlete/athlete.component';
import {AthleteResolver} from './services/athlete.resolver';
import {MeetsComponent} from './meets/meets.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create-athlete',
    component: CreateAthleteComponent
  },
  {
    path: 'meets',
    component: MeetsComponent
  },
  {
    path: 'athletes/:profileUrl',
    component: AthleteComponent,
    resolve: {
      athlete: AthleteResolver
    }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
