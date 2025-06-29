import {Component, OnInit, inject, signal} from '@angular/core';
import {ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Relation, RelationType} from '../../../core/models/models';
import { RelationService } from '../../../core/services/relation.service';
import { ContactService } from '../../../core/services/contact.service';
import { PropertyService } from '../../../core/services/property.service';
import {InputComponent} from '../../../shared/input/input.component';

@Component({
  selector: 'app-relation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, InputComponent],
  templateUrl: './relation-detail.component.html',
})
export class RelationDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private relationService = inject(RelationService);
  private contactService = inject(ContactService);
  private propertyService = inject(PropertyService);
  private router = inject(Router);

  relationId?: string;
  mode: 'create' | 'edit' | 'view' = 'create';

  contactId = signal("")
  propertyId = signal("")
  type = signal<RelationType>('Eigentümer')
  startDate = signal("")
  endDate = signal("")
  services = signal<string[]>([])

  relationTypes: RelationType[] = ['Eigentümer', 'Mieter', 'Dienstleister'];

  ngOnInit(): void {
    this.relationId = this.route.snapshot.paramMap.get('id') ?? undefined;
    this.mode = this.relationId ? 'edit' : 'create';



    if(this.relationId){
      const relation = this.relationService.getById(this.relationId);
      if (relation) {
        this.contactId.set(relation.contactId);
        this.propertyId.set(relation.propertyId);
        this.type.set(relation.type);
        this.startDate.set(relation.startDate);
        this.endDate.set(relation.endDate);
        this.services.set(relation.services || []);
      }
    }
  }

  get contacts() {
    return this.contactService.getAll();
  }

  get properties() {
    return this.propertyService.getAll();
  }

  get contactOptions(): Array<string> {
    return this.contacts.map(c => c.name);
  }

  get propertyOptions(): Array<string> {
    return this.properties.map(p => p.description);
  }

  onSubmit() {

    const relation: Omit<Relation, 'id'> & { id?: string } = {
      contactId: this.contacts.find(c => c.name === this.contactId())?.id ||  "",
      propertyId: this.properties.find(p => p.description === this.propertyId())?.id ||  "",
      type: this.type(),
      startDate: this.startDate(),
      endDate: this.endDate(),
      services: this.services()
    };

    if (relation.type === 'Mieter' && this.relationService.hasTenantConflict({...relation, id: this.relationId ?? ''})) {
      alert('Konflikt: Der Kontakt ist bereits Mieter in diesem Zeitraum.');
      return;
    }

    if (this.relationId) relation.id = this.relationId;

    this.relationService.save(relation as Relation);
    this.router.navigate(['/relations']);
  }
}
