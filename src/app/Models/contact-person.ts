import { Contact } from "./contact";

export interface ContactPerson {
  id: number;
  name: string;
  contacts: Contact[];
}