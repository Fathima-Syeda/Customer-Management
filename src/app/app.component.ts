import { Component, OnInit } from '@angular/core';
import { CmContactService } from './mock/contact.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {
  title = 'contact-management';
  obj = '';

  constructor(private cmContactService: CmContactService) {


  }

  ngOnInit() {
    this.check();
  }

  check() {
    let item: object;
    this.cmContactService.allContacts().subscribe((obj) => {
      item = obj;
      return item;
    });
    console.log('Checking cmContact Service:', item);
  }
  // servicecheck = new CmContactService(this.obj);
  // console.log("Checking service:");



}
