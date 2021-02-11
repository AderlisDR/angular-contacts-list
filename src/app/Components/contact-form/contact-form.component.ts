import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/Models/contact';
import { ContactService } from 'src/app/Services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnChanges {
  @Input() contacts: Contact[];
  @Input() personId: number;
  display = false;
  contactFormGroups: FormGroup[];

  constructor(private fb: FormBuilder,
    private contactService: ContactService) { }

  ngOnChanges() {
    if (this.contacts) {
      this.buildForm();
      this.display = true;
    }
  }

  buildForm(): void {
    this.contactFormGroups = this.contacts.map(contact => this.fb.group({
      id: [contact.id],
      description: [contact.description, [Validators.required]]
    }));
  }

  rebuildForm(): void {
    this.contactFormGroups = [];
    this.buildForm();
  }

  updateContact(contactId: number, value: string) {
    this.contactService.updatePersonContact(contactId, this.personId, value);
    this.contacts = this.contactService.getPersonContactsByPersonId(this.personId);
    this.rebuildForm();
  }

  deleteContact(contactId: number) {
    this.contactService.deletePersonContact(contactId, this.personId);
    this.contacts = this.contactService.getPersonContactsByPersonId(this.personId);
    this.rebuildForm();
  }

}
