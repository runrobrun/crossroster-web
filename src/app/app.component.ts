import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { GlobalSettings } from './global-settings';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(public user: UserService) {}
    today = new Date();
    public activeSeason = GlobalSettings.activeSeason;

    logout(): void {
        this.user.logout();
    }
}
