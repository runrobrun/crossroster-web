import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UserService } from "./services/user.service";
import { Observable } from "rxjs";

describe('AppComponent', () => {
    beforeEach(async () => {
      let isLoggedOut$: Observable<boolean>;
      let userServiceMock = {};
      await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [{ provide: UserService, useValue: userServiceMock}],
            declarations: [AppComponent],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

});
