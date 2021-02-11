import { Injectable } from '@angular/core';
import { Contact } from '../Models/contact';
import { ContactPerson } from '../Models/contact-person';

@Injectable()
export class ContactService {

  constructor() { }

  saveContactsToLocalStorage(contacts: ContactPerson[]): void {
    localStorage.setItem("contact-persons", JSON.stringify(contacts));
  }

  getContacts(): ContactPerson[] {
    return JSON.parse(localStorage.getItem("contact-persons")) as ContactPerson[];
  }

  getLastContactPersonRegisteredId(): number {
    const contactPersons = this.getContacts();
    return contactPersons[contactPersons.length - 1].id;
  }

  insertNewContact(newContactPerson: ContactPerson): void {
    let contactPersons = this.getContacts();
    contactPersons.push(newContactPerson);
    this.saveContactsToLocalStorage(contactPersons);
  }

  deleteContactPersonById(id: number): void {
    const contactPersons = this.getContacts();
    const index = contactPersons.findIndex(person => person.id === id);
    contactPersons.splice(index, 1);
    this.saveContactsToLocalStorage(contactPersons);
  }

  addContactToPersonById(id: number): void {
    const contactPersons = this.getContacts();
    const index = contactPersons.findIndex(person => person.id === id);
    let newContact: Contact = {
      id: this.getPersonLastContactId(id) + 1,
      description: ''
    };
    contactPersons[index].contacts.push(newContact)
    this.saveContactsToLocalStorage(contactPersons);
  }

  getPersonContactsByPersonId(personId: number): Contact[] {
    const contactPersons = this.getContacts();
    const index = contactPersons.findIndex(person => person.id === personId);
    return contactPersons[index].contacts;
  }

  getPersonLastContactId(personId: number): number {
    const contacts = this.getPersonContactsByPersonId(personId);
    const lastContact = contacts[contacts.length - 1];
    return lastContact ? lastContact.id : 0;
  }

  updatePersonContact(contactId: number, personId: number, value: string): void {
    const contactPersons = this.getContacts();
    const personIndex = contactPersons.findIndex(person => person.id === personId);
    const contactIndex = contactPersons[personIndex].contacts.findIndex(contact => contact.id === contactId);
    contactPersons[personIndex].contacts[contactIndex].description = value;
    this.saveContactsToLocalStorage(contactPersons);
  }

  deletePersonContact(contactId: number, personId: number) {
    const contactPersons = this.getContacts();
    const personIndex = contactPersons.findIndex(person => person.id === personId);
    const contactIndex = contactPersons[personIndex].contacts.findIndex(contact => contact.id === contactId);
    contactPersons[personIndex].contacts.splice(contactIndex, 1);
    this.saveContactsToLocalStorage(contactPersons);
  }

}
