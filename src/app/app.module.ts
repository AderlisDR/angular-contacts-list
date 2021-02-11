import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './Components/contact-form/contact-form.component';
import { ContactListComponent } from './Components/contact-list/contact-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactService } from './Services/contact.service';

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    ContactListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
