import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CmContactService } from '../../mock';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs/operators';
import { Subscription } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    const cmContactServiceStub = {
      userLogin: (data) => ({
        subscribe: (success, err) => {
          const successResponse = [{
            userName: 'skinnermay@frosnex.com',
            password: 'User@123',
            isAdmin: false
          },
          {
            userName: 'buchananbeach@genmom.com',
            password: 'User2@123',
            isAdmin: false
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
      declarations: [LoginComponent],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: CmContactService, useValue: cmContactServiceStub },
        { provide: FormBuilder, useValue: formBuilderStub },
        { provide: Router, useValue: routerStub }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnDestroy', () => {
    component.contactsSubscription = new Subscription();
    spyOn(component.contactsSubscription, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component.contactsSubscription.unsubscribe).toHaveBeenCalled();
  });

 });
