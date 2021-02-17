import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { APP_ROUTES, USER_VALIDATIONS } from 'src/app/shared/constants';
import { UserData } from 'src/app/shared/models';
import { FireAuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup = null;
  public dataLoading = false;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private fireAuthService: FireAuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.initFormGroup();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public registerUser(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.dataLoading = true;
    const userData: UserData = {
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      username: this.registerForm.get('username').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
    };
    this.fireAuthService
      .signUp(userData.email, userData.password)
      .pipe(takeUntil(this.ngUnsubscribe))
      .pipe(finalize(() => (this.dataLoading = false)))
      .subscribe((response) => {
        if (response) {
          this.router.navigate([`${APP_ROUTES.LOGIN.path}`]);
        }
      });
  }

  private initFormGroup(): void {
    this.registerForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(USER_VALIDATIONS.FIRST_NAME.MIN_LENGTH),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(USER_VALIDATIONS.LAST_NAME.MIN_LENGTH),
        ],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(USER_VALIDATIONS.USERNAME.MIN_LENGTH),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(USER_VALIDATIONS.EMAIL.MIN_LENGTH),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(USER_VALIDATIONS.PASSWORD.MIN_LENGTH),
        ],
      ],
    });
  }
}
