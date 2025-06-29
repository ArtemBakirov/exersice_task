import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { PropertyService } from '../../../core/services/property.service';
import {Address, Property } from '../../../core/models/models';
import {AddressInputComponent} from '../../../shared/address-input/address-input.component';
import {InputComponent} from '../../../shared/input/input.component';

@Component({
  standalone: true,
  selector: 'app-property-detail',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AddressInputComponent, InputComponent],
  templateUrl: './property-detail.component.html'
})
export class PropertyDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private propertyService = inject(PropertyService);
  private router = inject(Router);

  description = signal("")
  street = signal("")
  city = signal("")
  zipCode = signal("")
  country = signal("")

  mode: 'create' | 'edit' | 'view' = 'create';
  propertyId?: string;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.propertyId = id ?? undefined;
    const queryMode = this.route.snapshot.queryParamMap.get('mode') as 'view' | 'edit' | null;

    this.mode = !this.propertyId ? 'create' : queryMode === 'view' ? 'view' : 'edit';

    const property = this.propertyId ? this.propertyService.getById(this.propertyId) : undefined;
    if(property){
      this.description.set(property.description);
      this.street.set(property.address.street);
      this.city.set(property.address.city);
      this.zipCode.set(property.address.zipCode);
      this.country.set(property.address.country);
    }
  }

  onAddressSelected(address: Partial<Address>) {
    this.street.set(address.street || '');
    this.city.set(address.city || '');
    this.zipCode.set(address.zipCode || '');
    this.country.set(address.country || '');
  }


  onSubmit() {

    if (this.mode === 'view') {
      return;
    }

    const property: Omit<Property, 'id'> & { id?: string } = {
      description: this.description(),
      address: {
        street: this.street(),
        city: this.city(),
        zipCode: this.zipCode(),
        country: this.country(),
      },
    };

    if (this.propertyId) {
      property.id = this.propertyId;
    }

    this.propertyService.save(property);
    this.router.navigate(['/properties']);
  }
}
