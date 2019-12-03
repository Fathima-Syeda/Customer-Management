import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CmContactService } from '../../mock';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { startWith, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: []
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  @Input() tableData;
  rowData: any;
  userForm: FormGroup;
  saveEnable: boolean;
  editEnable: boolean;
  editForm: boolean;
  allNamesData = [];
  friends = [];
  id: any;
  filteredOptions: Observable<string[]>;
  isValid: boolean;
  model: any;
  genderVal = '';
  contactsSubscription: Subscription;
  searchContactsSubscription: Subscription;
  constructor(private cmContactService: CmContactService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    let that = this;
    this.saveEnable = false;
    this.editEnable = false;
    this.editForm = false;
    this.isValid = true;
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: [''],
      gender: [''],
      company: [''],
      phone: [''],
      birthday: [''],
      email: [''],
      addFriend: [''],
      note: ['']
    });
    this.userForm.reset();

    this.contactsSubscription = this.cmContactService.allNames().subscribe((response) => {
      that.allNamesData = response.map(person => ({
        id: person.id,
        name: person.id + ' - ' + person.firstName + ' ' + person.lastName
      }));
    });

    this.filteredOptions = this.userForm.controls.addFriend.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.cmContactService.rowSelected.subscribe(function (message) {
      if (message !== '') {
        that.rowData = message;
        that.editEnable = true;
        that.editForm = false;
        that.friends = [];
        that.setForm(that.rowData);
      }
    });

    this.cmContactService.contactAdded.subscribe((response) => {
      if (response === 'create') {
        that.id = '';
        that.editForm = true;
        that.saveEnable = true;
        that.editEnable = false;
        that.friends = [];
        that.userForm.reset();
      }
    });
  }

  /**
  * Method to filter add friends list
  */
  private _filter(value: string): string[] {
    if (typeof (value) === 'object' && value !== null) {
      value = value['name'];
    }
    if (value !== '' && value !== null) {
      const filterValue = value.toLowerCase();
      return this.allNamesData.filter(option => option.name.toLowerCase().includes(filterValue));
    }
  }

  onEdit() {
    if (this.editForm) {
      this.onRevert();
      document.getElementById('btEdit').innerText = 'Edit';
    } else {
      document.getElementById('btEdit').innerText = 'Revert';
    }
    this.saveEnable = !this.saveEnable;
    this.editForm = !this.editForm;
  }

  setForm(data) {
    this.id = data.id;
    this.userForm.controls.firstName.setValue(data.firstName);
    this.userForm.controls.lastName.setValue(data.lastName);
    this.userForm.controls.address.setValue(data.address);
    this.userForm.controls.company.setValue(data.company);
    this.userForm.controls.phone.setValue(data.phone);
    this.userForm.controls.birthday.setValue(data.birthday);
    this.userForm.controls.email.setValue(data.email);
    this.userForm.controls.note.setValue(data.note);
    this.genderVal = data.gender;

    this.getFriends(data.friends);

  }

  /**
  * Method to get list of friends
  */

  getFriends(list: any) {
    let that = this;
    this.friends = [];
    if (list.length > 0) {
      list.forEach(element => {
        this.searchContactsSubscription = this.cmContactService.searchFriends(element).subscribe((response) => {
          that.friends.push({
            id: response[0].id,
            name: response[0].id + ' - ' + response[0].firstName + ' ' + response[0].lastName
          });
        }, (error)=> {
          console.log('Error in getting friends', error.message);
        });
      });
    }

  }

  /**
    * Method to add a friend to the list of friends
    */

  addFriend(option) {
    this.friends.push({
      id: option.id,
      name: option.name
    });
    this.userForm.controls.addFriend.setValue('');
  }

  /**
   * Method to save form changes
   */
  saveForm() {
    let friends = [];
    let formControls = this.userForm.controls;

    this.friends.forEach(element => {
      friends.push(element.id);
    });

    if (formControls.firstName.value === '' || formControls.firstName.value === null) {
      this.isValid = false;
      return;
    } else if (formControls.lastName.value === '' || formControls.lastName.value === null) {
      this.isValid = false;
      return;
    } else if (formControls.email.value === '' || formControls.email.value === null) {
      this.isValid = false;
      return;
    } else {
      this.isValid = true;
    }

    let object = {
      id: this.id ? this.id : this.tableData.length,
      guid: '',
      firstName: this.userForm.controls.firstName.value ? this.userForm.controls.firstName.value : '',
      lastName: this.userForm.controls.lastName.value ? this.userForm.controls.lastName.value : '',
      gender: this.genderVal,
      company: this.userForm.controls.company.value ? this.userForm.controls.company.value : '',
      username: this.userForm.controls.email.value ? this.userForm.controls.email.value : '',
      email: this.userForm.controls.email.value ? this.userForm.controls.email.value : '',
      phone: this.userForm.controls.phone.value ? this.userForm.controls.phone.value : '',
      address: this.userForm.controls.address.value ? this.userForm.controls.address.value : '',
      birthday: this.userForm.controls.birthday.value ? this.userForm.controls.birthday.value : '',
      friends: friends,
      note: this.userForm.controls.note.value ? this.userForm.controls.note.value : ''
    };

    // this.tableData.push(object);

    if (this.tableData[object.id]) {
      this.allNamesData[object.id] = {
        id: object.id,
        name: object.id + ' - ' + object.firstName + ' ' + object.lastName
      };
      this.tableData[object.id] = object;
    } else {
      this.allNamesData.push({
        id: object.id,
        name: object.id + ' - ' + object.firstName + ' ' + object.lastName
      });
      this.tableData.push(object);
    }

    this.cmContactService.addContact(object);

    this.editForm = false;
    this.editEnable = true;
    this.saveEnable = false;
    this.id = object.id;
    document.getElementById('btEdit').innerText = 'Edit';

  }

  onRevert() {
    this.setForm(this.tableData[this.id]);
  }

  genderSelected(value) {
    this.genderVal = value;
  }

  ngOnDestroy() {
    if (this.contactsSubscription) {
      this.contactsSubscription.unsubscribe();
    }
    if (this.searchContactsSubscription) {
      this.searchContactsSubscription.unsubscribe();
    }
  }

}
