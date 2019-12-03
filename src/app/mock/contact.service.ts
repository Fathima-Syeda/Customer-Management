import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { CmContact } from './contact.model';

export class CmContactData implements InMemoryDbService {
  createDb() {
    const contacts = require('assets/contacts.json');
    const login = require('assets/login.json');
    return { contacts, login };
  }
}

/**
 * Refer to https://github.com/angular/in-memory-web-api#angular-in-memory-web-api
 * on how to simulate the REST service.
 */
@Injectable({
  providedIn: 'root'
})
export class CmContactService {
  private log = window.console;
  private contactsUrl = 'app/contacts';
  private loginUrl = 'app/login';

  private selectRow = new BehaviorSubject('');
  rowSelected = this.selectRow.asObservable();

  private newContact = new BehaviorSubject('');
  contactAdded = this.newContact.asObservable();

  private login = new BehaviorSubject('');
  loggedIn = this.login.asObservable();

  constructor(
    private http: HttpClient
  ) {
  }



  allContacts(): Observable<CmContact[]> {
    return this.http.get(this.contactsUrl)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  saveContact(contact: CmContact): Observable<boolean> {
    return this.http.post(this.contactsUrl, contact)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  getContactById(id: number): Observable<CmContact> {
    return this.http.get(`${this.contactsUrl}/${id}`)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  search(term?: string): Observable<CmContact[]> {
    const url = term ? `${this.contactsUrl}?firstName=^${term}` : this.contactsUrl;
    return this.http.get(url)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  private handleError(res: HttpErrorResponse | any): Observable<any> {
    // in a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (res instanceof HttpErrorResponse) {
      const err = res.error;
      errMsg = `${res.status} - ${res.statusText || ''} ${err}`;
    } else {
      errMsg = res.message ? res.message : res.toString();
    }
    this.log.error(errMsg);
    return of(errMsg);
  }



  rowSelection(message: string) {
    this.selectRow.next(message);
  }

  addContact(message: any) {
    this.newContact.next(message);
  }

  addLogin(message: any) {
    this.login.next(message);
  }

  allNames(): Observable<CmContact[]> {
    return this.http.get(this.contactsUrl)
      .pipe(map((data: any) => {
        return data.map(({ id, firstName, lastName }) => {
          return ({ id, firstName, lastName });
        });
      })
        // catchError(err => this.handleError(err))
      );
  }

  searchFriends(term?: any): Observable<CmContact[]> {
    const url = term ? `${this.contactsUrl}?id=^${term}$` : this.contactsUrl;
    return this.http.get(url)
      .pipe(
        map((data: any) => data.map(({ id, firstName, lastName }) => {
          return ({ id, firstName, lastName });
        }))
        // catchError(err => this.handleError(err))
      );
  }

  userLogin(): Observable<CmContact[]> {
    return this.http.get(this.loginUrl)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }
}
