import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../core/services/property.service';
import { Relation } from '../../core/models/models';

@Component({
  selector: 'app-relation-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relation-summary.component.html',
})
export class RelationSummaryComponent implements OnInit {
  @Input() relation!: Relation;

  private propertyService = inject(PropertyService);

  propertyName: string = '';

  ngOnInit(): void {
    const property = this.propertyService.getById(this.relation.propertyId);
    this.propertyName = property?.description ?? 'Unbekannt';
  }
}
