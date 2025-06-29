import { Injectable } from '@angular/core';
import {Contact} from '../models/models';
import {v4 as uuidv4} from 'uuid';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly key = 'contacts';

  getAll(): Contact[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  getById(id: string): Contact | undefined {
    return this.getAll().find(c => c.id === id);
  }

  save(contact: Omit<Contact, 'id'> & { id?: string }) {
    const all = this.getAll();
    if (!contact.id) {
      contact.id = uuidv4();
    }

    const idx = all.findIndex(c => c.id === contact.id);
    if (idx > -1) all[idx] = contact as Contact;
    else all.push(contact as Contact);
    localStorage.setItem(this.key, JSON.stringify(all));
  }

  delete(id: string) {
    const all = this.getAll().filter(c => c.id !== id);
    localStorage.setItem(this.key, JSON.stringify(all));
  }
}


// 🌀 Optional: Reactive Data with BehaviorSubject
