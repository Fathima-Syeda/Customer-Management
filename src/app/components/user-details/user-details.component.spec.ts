import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CmContactService } from '../../mock';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subscription } from 'rxjs';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  beforeEach(() => {
    const cmContactServiceStub = {
      searchFriends: (data) => ({
        subscribe: (success, err) => {
          const successResponse = [{
            id: 0,
            guid: '64824a70-e0ce-47fe-8d46-95aba9f1e034',
            firstName: 'Skinner',
            lastName: 'May',
            gender: 'male',
            company: 'FROSNEX',
            username: 'skinnermay@frosnex.com',
            email: 'skinnermay@frosnex.com',
            phone: '+1 (801) 420-3882',
            address: '342 Maple Avenue, Dana, Vermont, 2898',
            birthday: '1990-06-04',
            friends: [
              785,
              264,
              352,
              923,
              290
            ],
            note: 'Non nulla excepteur adipisicing reprehenderit incididunt voluptate sit non adipisicing pariatur fugiat.'
          }
          ];
          const errMsg = '';
          success(successResponse);
          err(errMsg);
        }
      }),

    };
    const formBuilderStub = {
      group: () => { }
    };
    const routerStub = {};

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UserDetailsComponent],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: CmContactService, useValue: cmContactServiceStub },
        { provide: FormBuilder, useValue: formBuilderStub },
        { provide: Router, useValue: routerStub }
      ]
    });
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    component.userForm = formBuilderStub.group({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnDestroy', () => {
    component.contactsSubscription = new Subscription();
    component.searchContactsSubscription = new Subscription();
    spyOn(component.contactsSubscription, 'unsubscribe').and.callThrough();
    spyOn(component.searchContactsSubscription, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component.contactsSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.searchContactsSubscription.unsubscribe).toHaveBeenCalled();
  });
});
