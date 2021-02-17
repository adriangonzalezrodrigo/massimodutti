import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { APP_ROUTES } from 'src/app/shared';
import { USER_VALIDATIONS } from 'src/app/shared/constants';
import { FireAuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup = null;
  public dataLoading = false;
  public unregistered = false;

  invalid = false;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private fireAuthService: FireAuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public loginUser(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.unregistered = false;
    this.dataLoading = true;
    this.fireAuthService
      .signIn(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      )
      .pipe(takeUntil(this.ngUnsubscribe))
      .pipe(finalize(() => (this.dataLoading = false)))
      .subscribe((response) => {
        if (response) {
          this.router.navigate([
            `${APP_ROUTES.PRINCIPAL.path}/${APP_ROUTES.SHIPS.path}`,
          ]);
        } else {
          this.unregistered = true;
        }
      });
  }

  private initFormGroup(): void {
    this.loginForm = this.fb.group({
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
