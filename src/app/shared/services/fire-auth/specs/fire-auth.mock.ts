import { Observable, of } from 'rxjs';

export class FireAuthServiceMock {
  public isLoggedIn = true;

  public signIn(email: string, password: string): Observable<boolean> {
    return of(true);
  }

  public signUp(email: string, password: string): Observable<boolean> {
    return of(true);
  }

  public signOut(): Observable<boolean> {
    return of(true);
  }
}
