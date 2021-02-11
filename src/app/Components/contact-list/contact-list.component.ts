import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ContactPerson } from 'src/app/Models/contact-person';
import { ContactService } from 'src/app/Services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnChanges {
  @Input() contactPersons: ContactPerson[];
  newContactName = new FormControl('');
  dataLoaded = false;

  constructor(private contactService: ContactService) { }

  ngOnChanges(){
    if (this.contactPersons) {
      this.dataLoaded = true;
      this.newContactName.setValidators([Validators.required]);
    }
  }

  addContactPerson() {
    const newContactPerson: ContactPerson = {
      id: this.contactService.getLastContactPersonRegisteredId() + 1,
      name: this.newContactName.value,
      contacts: []
    }

    this.contactService.insertNewContact(newContactPerson)
    this.contactPersons = this.contactService.getContacts();
  }

  deleteContactPerson(contactPersonId: number) {
    this.contactService.deleteContactPersonById(contactPersonId);
    this.contactPersons = this.contactService.getContacts();
  }

  addContactToPerson(contactPersonId: number) {
    this.contactService.addContactToPersonById(contactPersonId);
    this.contactPersons = this.contactService.getContacts();
  }

}
