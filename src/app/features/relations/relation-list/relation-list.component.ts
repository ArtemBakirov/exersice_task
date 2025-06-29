import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RelationService } from '../../../core/services/relation.service';
import { ContactService } from '../../../core/services/contact.service';
import { PropertyService } from '../../../core/services/property.service';
import { Relation } from '../../../core/models/models';

@Component({
  selector: 'app-relation-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './relation-list.component.html'
})
export class RelationListComponent {
  relations: Relation[] = [];

  constructor(
    private relationService: RelationService,
    private contactService: ContactService,
    private propertyService: PropertyService
  ) {
    this.load();
  }

  load() {
    this.relations = this.relationService.getAll();
  }

  getContactName(id: string): string {
    return this.contactService.getById(id)?.name ?? 'Unbekannt';
  }

  getPropertyDescription(id: string): string {
    return this.propertyService.getById(id)?.description ?? 'Unbekannt';
  }

  deleteRelation(id: string) {
    if (confirm('Diese Beziehung wirklich löschen?')) {
      this.relationService.delete(id);
      this.load();
    }
  }
}
