import {Component, inject} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {PropertyService} from '../../../core/services/property.service';
import {Property} from '../../../core/models/models';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  imports: [CommonModule, RouterModule]
})
export class PropertyListComponent {
  private propertyService = inject(PropertyService);
  properties: Property[] = [];

  constructor() {
    this.loadProperties();
  }

  loadProperties() {
    this.properties = this.propertyService.getAll();
  }

  deleteProperty(id: string) {
    if (confirm('Willst du diese Immobilie wirklich löschen?')) {
      this.propertyService.delete(id);
      this.loadProperties();
    }
  }
}
