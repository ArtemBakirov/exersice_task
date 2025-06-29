import {Component, OnInit, inject, signal} from '@angular/core';
import { ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactService } from '../../../core/services/contact.service';
import {RelationService} from '../../../core/services/relation.service';
import {Contact, Address, Relation} from '../../../core/models/models';
import { CommonModule } from '@angular/common';
import { AddressInputComponent } from '../../../shared/address-input/address-input.component';
import { RelationSummaryComponent } from '../../../shared/relation-summary.component/relation-summary.component';
import {InputComponent} from '../../../shared/input/input.component';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AddressInputComponent, RelationSummaryComponent, InputComponent],
  templateUrl: './contacts-detail.component.html'
})
export class ContactsDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private contactService = inject(ContactService);
  private relationService = inject(RelationService);
  private router = inject(Router);

  contactId?: string;
  mode: 'create' | 'edit' | 'view' = 'create';
  contactsRelations: Relation[] = [];

  name = signal("")
  street = signal("")
  city = signal("")
  zipCode = signal("")
  country = signal("")

  ngOnInit(): void {
    this.contactId = this.route.snapshot.paramMap.get('id') ?? undefined;
    const queryMode = this.route.snapshot.queryParamMap.get('mode') as 'view' | 'edit' | null;
    this.mode = !this.contactId ? 'create' : queryMode === 'view' ? 'view' : 'edit';

    const contact = this.contactId ? this.contactService.getById(this.contactId) : undefined;
    if(contact){
      this.name.set(contact.name);
      this.street.set(contact.address.street);
      this.city.set(contact.address.city);
      this.zipCode.set(contact.address.zipCode);
      this.country.set(contact.address.country);
    }

    if (this.mode === 'view') {
      this.contactsRelations = this.relationService.getByContactId(this.contactId!);
    }
  }

  onAddressSelected(address: Partial<Address>) {
    this.street.set(address.street || '');
    this.city.set(address.city || '');
    this.zipCode.set(address.zipCode || '');
    this.country.set(address.country || '');
  }

  onSubmit() {

    const contact: Omit<Contact, 'id'> & { id?: string } = {
      name: this.name(),
      address: {
        street: this.street(),
        city: this.city(),
        zipCode: this.zipCode(),
        country: this.country()
      }
    };

    if (this.contactId) contact.id = this.contactId;

    this.contactService.save(contact);
    this.router.navigate(['/contacts']);
  }
}
