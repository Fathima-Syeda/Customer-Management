import { Component, OnInit, OnDestroy } from '@angular/core';
import { CmContactService } from '../../mock';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: []
})
export class UsersComponent implements OnInit, OnDestroy {

  data = [
    { columnDef: 'id', header: 'ID' },
    { columnDef: 'firstName', header: 'First Name' },
    { columnDef: 'lastName', header: 'Last Name' },
    { columnDef: 'gender', header: 'Gender' },
    { columnDef: 'company', header: 'Company' },
    { columnDef: 'email', header: 'Email' },
    { columnDef: 'phone', header: 'Phone' },
    { columnDef: 'address', header: 'Address' },
    { columnDef: 'birthday', header: 'Birthday' },
  ];

  displayedColumns = ['ID', 'First Name', 'Last Name', 'Gender', 'gender', 'Company',
    'Username', 'Email', 'Phone', 'Address', 'Birthday', 'Friends'];

  tableData: any;
  totalRecords: number;
  params: any;
  isAdmin: any;
  navFrom: any;
  contactsSubscription: Subscription;


  constructor(private cmContactService: CmContactService, private router: Router) {
    this.getData();
    if (this.router.getCurrentNavigation().extras.state) {
      this.navFrom = this.router.getCurrentNavigation().extras.state.navFrom; // redirecting to login page on refresh
    } else {
      this.navFrom = '';
    }

    if (this.navFrom !== 'login') {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    /**
   * Conditionally toggling screen view for User and Admin
   */
    this.cmContactService.loggedIn.subscribe(response => {
      this.isAdmin = response['isAdmin'];
    });
    let userForm = document.getElementById('userDetailsForm');
    let addBtn = document.getElementById('addNew');
    if (this.isAdmin === true) {
      userForm.style.display = 'block';
      addBtn.style.display = 'block';
    } else {
      userForm.style.display = 'none';
      addBtn.style.display = 'none';
    }
  }

  /**
   * Method to get Table Data
   */

  getData() {
    this.contactsSubscription = this.cmContactService.allContacts().subscribe((response) => {
      this.tableData = response;
      this.totalRecords = response.length;
    }, (error) => {
      console.log('Error is getting contacts', error.message);
    });
  }

  addNew() {
    this.cmContactService.addContact('create');
  }

  logOut() {
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    if (this.contactsSubscription) {
      this.contactsSubscription.unsubscribe();
    }
  }
}
