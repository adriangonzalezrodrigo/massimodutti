import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_ROUTES } from 'src/app/shared/constants';
import { FireAuthService } from 'src/app/shared/services';
import { FireAuthServiceMock } from '../../../../../shared/services/fire-auth/specs/fire-auth.mock';
import { LoginComponent } from '../login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [
          FormsModule,
          RouterTestingModule.withRoutes([
            {
              path: `${APP_ROUTES.PRINCIPAL.path}/${APP_ROUTES.SHIPS.path}`,
              redirectTo: '',
              pathMatch: 'full',
            },
          ]),
          ReactiveFormsModule,
        ],
        providers: [
          { provide: FireAuthService, useClass: FireAuthServiceMock },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initFormGroup should initialize form group', () => {
    component['initFormGroup']();

    expect(
      component.loginForm.get('email') instanceof FormControl
    ).toBeTruthy();
    expect(
      component.loginForm.get('password') instanceof FormControl
    ).toBeTruthy();
  });

  it('registerUser should calls signUp service method when login form is valid', () => {
    spyOn<any>(component['fireAuthService'], 'signIn').and.callThrough();
    const navigateSpy = spyOn(router, 'navigate');
    component.loginForm.setValue({
      email: 'email@mail.com',
      password: 'password',
    });

    component.loginUser();

    expect(component.loginForm.valid).toBeTruthy();
    expect(navigateSpy).toHaveBeenCalled();
    expect(component['fireAuthService'].signIn).toHaveBeenCalledWith(
      'email@mail.com',
      'password'
    );
  });
});
