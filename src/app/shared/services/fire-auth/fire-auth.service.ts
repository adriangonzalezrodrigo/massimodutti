import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import firebase from 'firebase';
import { from, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class FireAuthService {
  public userState: firebase.User = null;

  public get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false;
  }

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userState = user;
        localStorage.setItem('user', JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  public signIn(email: string, password: string): Observable<boolean> {
    return from(
      this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.setUserData(result.user);
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        })
    );
  }

  public signUp(email: string, password: string): Observable<boolean> {
    return from(
      this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          this.sendVerificationMail();
          this.setUserData(result.user);
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        })
    );
  }

  public signOut(): Observable<boolean> {
    return from(
      this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        return true;
      })
    );
  }

  private setUserData(user: firebase.User): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userState: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userState, {
      merge: true,
    });
  }

  private sendVerificationMail(): Promise<void> {
    return this.afAuth.currentUser.then((u) => u.sendEmailVerification());
  }
}
