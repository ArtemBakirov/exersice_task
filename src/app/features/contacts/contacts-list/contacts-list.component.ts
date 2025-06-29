import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../core/services/contact.service';
import { Contact } from '../../../core/models/models';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contacts-list.component.html'
})
export class ContactsListComponent {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {
    this.loadContacts();
  }

  loadContacts() {
    this.contacts = this.contactService.getAll();
  }

  deleteContact(id: string) {
    if (confirm('Diesen Kontakt wirklich löschen?')) {
      this.contactService.delete(id);
      this.loadContacts();
    }
  }
}
