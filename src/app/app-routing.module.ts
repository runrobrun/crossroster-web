import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateAthleteComponent } from './create-athlete/create-athlete.component';
import { LoginComponent } from './login/login.component';
import { AthleteComponent } from './athlete/athlete.component';
import { AthleteResolver } from './services/athlete.resolver';
import { MeetsComponent } from './meets/meets.component';
import { CreateMeetComponent } from './create-meet/create-meet.component';
import { CreateResultComponent } from './create-result/create-result.component';
import { SeasonComponent } from './season/season.component';
import { GlobalSettings } from './global-settings';
import { SeasonResolver } from './services/season.resolver';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'create-athlete',
        component: CreateAthleteComponent,
    },
    {
        path: 'create-meet',
        component: CreateMeetComponent,
    },
    {
        path: 'create-result/:id',
        component: CreateResultComponent,
    },
    {
        path: 'meets',
        component: MeetsComponent,
    },
    {
        path: `seasons/:seasonYear`,
        component: SeasonComponent,
        resolve: {
            season: SeasonResolver,
        },
    },
    {
        path: 'athletes/:profileUrl',
        component: AthleteComponent,
        resolve: {
            athlete: AthleteResolver,
        },
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '**',
        redirectTo: '/',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
