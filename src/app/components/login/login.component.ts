import { Component, OnInit, OnDestroy } from '@angular/core';
import { CmContactService } from '../../mock';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit, OnDestroy {
  userData;
  totalRecords: number;
  loginForm: FormGroup;
  isValid: boolean;
  contactsSubscription: Subscription;

  constructor(private cmContactService: CmContactService, private formBuilder: FormBuilder, private router: Router) {
    this.getUser();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.isValid = true;
  }

  /**
  * Method to get Contact Data
  */
  getUser() {
    this.contactsSubscription = this.cmContactService.userLogin().subscribe((response) => {
      this.userData = response;
      this.totalRecords = response.length;
    }, (error) => {
      console.log('Error in getting users', error.message);
    });
  }

  /**
  * Method to validate Contact login
  */
  userLogin() {
    if (this.loginForm.valid) {
      let arrVal = this.userData.find(user => user.userName === this.loginForm.controls.userName.value);
      this.cmContactService.addLogin(arrVal);
      if (arrVal && arrVal.password === (this.loginForm.controls.password.value) && arrVal.userName === (this.loginForm.controls.userName.value)) {
        this.router.navigate(['./users'], { state: { navFrom: 'login' } });
      } else {
        this.isValid = false;
      }
    }
  }

  ngOnDestroy() {
    if (this.contactsSubscription) {
      this.contactsSubscription.unsubscribe();
    }
  }
}
