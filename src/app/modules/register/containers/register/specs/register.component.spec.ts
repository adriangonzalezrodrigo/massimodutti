import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_ROUTES } from 'src/app/shared/constants';
import { FireAuthService } from 'src/app/shared/services';
import { RegisterComponent } from '../register.component';
import { FireAuthServiceMock } from 'src/app/shared/services/fire-auth/specs/fire-auth.mock';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RegisterComponent],
        imports: [
          FormsModule,
          RouterTestingModule.withRoutes([
            { path: APP_ROUTES.LOGIN.path, redirectTo: '', pathMatch: 'full' },
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
    fixture = TestBed.createComponent(RegisterComponent);
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
      component.registerForm.get('firstName') instanceof FormControl
    ).toBeTruthy();
    expect(
      component.registerForm.get('lastName') instanceof FormControl
    ).toBeTruthy();
    expect(
      component.registerForm.get('username') instanceof FormControl
    ).toBeTruthy();
    expect(
      component.registerForm.get('email') instanceof FormControl
    ).toBeTruthy();
    expect(
      component.registerForm.get('password') instanceof FormControl
    ).toBeTruthy();
  });

  it('registerUser should calls signUp service method when login form is valid', () => {
    spyOn<any>(component['fireAuthService'], 'signUp').and.callThrough();
    const navigateSpy = spyOn(router, 'navigate');
    component.registerForm.setValue({
      firstName: 'firstName',
      lastName: 'lastName',
      username: 'username',
      email: 'email@mail.com',
      password: 'password',
    });

    component.registerUser();

    expect(component.registerForm.valid).toBeTruthy();
    expect(navigateSpy).toHaveBeenCalled();
    expect(component['fireAuthService'].signUp).toHaveBeenCalledWith(
      'email@mail.com',
      'password'
    );
  });
});
