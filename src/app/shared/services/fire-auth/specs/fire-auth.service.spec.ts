import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FireAuthService } from '../fire-auth.service';

export const mockFirebaseUser = {
  user: {
    uid: 'uid',
    email: 'email',
    displayName: 'displayName',
    photoURL: 'photoURL',
    emailVerified: true,
  },
};

describe('FireAuthService', () => {
  let service: FireAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp({
          apiKey: 'apiKey',
          authDomain: 'authDomain',
          projectId: 'projectId',
          storageBucket: 'storageBucket',
          messagingSenderId: 'messagingSenderId',
          appId: 'appId',
          measurementId: 'measurementId',
        }),
        AngularFireAuthModule,
        AngularFirestoreModule,
      ],
      providers: [FireAuthService],
    });
    service = TestBed.inject(FireAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isLoggedIn should returns false when there is no user in local storage', () => {
    localStorage.removeItem('user');
    const resp = service.isLoggedIn;

    expect(resp).toBeFalsy();
  });

  it('isLoggedIn should returns true when there is user in local storage', () => {
    localStorage.setItem('user', JSON.stringify(mockFirebaseUser));
    const resp = service.isLoggedIn;

    expect(resp).toBeTruthy();
  });

  it('signIn should calls signInWithEmailAndPassword method returning true value for successfull login', (done) => {
    spyOn<any>(service['afAuth'], 'signInWithEmailAndPassword').and.returnValue(
      Promise.resolve(mockFirebaseUser)
    );
    spyOn<any>(service['afAuth'], 'setUserData').and.returnValue(
      Promise.resolve()
    );

    service.signIn('email', 'password').subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });

    expect(service['afAuth'].signInWithEmailAndPassword).toHaveBeenCalled();
  });

  it('signIn should calls signInWithEmailAndPassword method returning false value when login fails', (done) => {
    spyOn<any>(service['afAuth'], 'signInWithEmailAndPassword').and.returnValue(
      Promise.reject()
    );

    service.signIn('email', 'password').subscribe((res) => {
      expect(res).toBeFalsy();
      done();
    });

    expect(service['afAuth'].signInWithEmailAndPassword).toHaveBeenCalled();
  });

  it('signUp should calls createUserWithEmailAndPassword method that returns true value for valid action', (done) => {
    spyOn<any>(
      service['afAuth'],
      'createUserWithEmailAndPassword'
    ).and.returnValue(Promise.resolve(mockFirebaseUser));
    spyOn<any>(service, 'sendVerificationMail').and.returnValue(null);
    spyOn<any>(service['afAuth'], 'setUserData').and.returnValue(
      Promise.resolve()
    );

    service.signUp('email', 'password').subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });

    expect(service['afAuth'].createUserWithEmailAndPassword).toHaveBeenCalled();
  });

  it('signUp should calls createUserWithEmailAndPassword method that returns false value when action fails', (done) => {
    spyOn<any>(
      service['afAuth'],
      'createUserWithEmailAndPassword'
    ).and.returnValue(Promise.reject());
    spyOn<any>(service, 'sendVerificationMail').and.returnValue(null);
    spyOn<any>(service['afAuth'], 'setUserData').and.returnValue(
      Promise.resolve()
    );

    service.signUp('email', 'password').subscribe((res) => {
      expect(res).toBeFalsy();
      done();
    });

    expect(service['afAuth'].createUserWithEmailAndPassword).toHaveBeenCalled();
  });

  it('signOut should calls signOut method', () => {
    spyOn<any>(service['afAuth'], 'signOut').and.returnValue(Promise.resolve());

    service.signOut();

    expect(service['afAuth'].signOut).toHaveBeenCalled();
  });
});
