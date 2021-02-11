import { Component, OnInit } from '@angular/core';
import contacts from './../assets/Files/contacts.json';
import { ContactPerson } from './Models/contact-person';
import { ContactService } from './Services/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-contact-list';
  initialContacts: ContactPerson[] = contacts;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.saveContactsToLocalStorage(this.initialContacts);
  }
}
