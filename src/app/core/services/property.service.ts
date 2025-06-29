import { Injectable } from '@angular/core';
import { Property } from '../models/models';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private readonly key = 'properties';

  getAll(): Property[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  getById(id: string): Property | undefined {
    return this.getAll().find(p => p.id === id);
  }

  save(property: Omit<Property, 'id'> & { id?: string }): void {
    const all = this.getAll();
    if (!property.id) {
      property.id = uuidv4();
    }

    const idx = all.findIndex(p => p.id === property.id);
    if (idx > -1) all[idx] = property as Property;
    else all.push(property as Property);
    localStorage.setItem(this.key, JSON.stringify(all));
  }

  delete(id: string): void {
    const all = this.getAll().filter(p => p.id !== id);
    localStorage.setItem(this.key, JSON.stringify(all));
  }
}
