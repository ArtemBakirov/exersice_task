// core/services/relation.service.ts
import { Injectable } from '@angular/core';
import {Relation} from '../models/models';
import {v4 as uuidv4} from 'uuid';

@Injectable({ providedIn: 'root' })
export class RelationService {
  private readonly key = 'relations';

  getAll(): Relation[] {
    const relations = JSON.parse(localStorage.getItem(this.key) || '[]');
    return relations;
  }

  getById(id: string): Relation | undefined {
    return this.getAll().find(p => p.id === id);
  }

  getByContactId(contactId: string): Relation[] {
    return this.getAll().filter(r => r.contactId === contactId);
  }

  save(relation: Relation): void {
    const all = this.getAll();
    if (!relation.id) {
      relation.id = uuidv4();
    }
    const idx = all.findIndex(r => r.id === relation.id);
    if (idx > -1) all[idx] = relation;
    else all.push(relation);
    localStorage.setItem(this.key, JSON.stringify(all));
  }

  delete(id: string): void {
    const all = this.getAll().filter(r => r.id !== id);
    localStorage.setItem(this.key, JSON.stringify(all));
  }

  hasTenantConflict(relation: Relation): boolean {
    if (relation.type !== 'Mieter') return false;
    return this.getAll().some(r =>
      r.type === 'Mieter' &&
      r.contactId === relation.contactId &&
      this.datesOverlap(r.startDate, r.endDate, relation.startDate, relation.endDate)
    );
  }

  private datesOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string): boolean {
    const a1 = new Date(aStart);
    const a2 = new Date(aEnd);
    const b1 = new Date(bStart);
    const b2 = new Date(bEnd);
    return a1 <= b2 && b1 <= a2;
  }
}
