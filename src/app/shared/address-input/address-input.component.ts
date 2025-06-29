import {
  Component,
  EventEmitter,
  Output,
  AfterViewInit,
  forwardRef, signal, Input, inject
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { Address } from '../../core/models/models';
import { InputComponent } from '../input/input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-input',
  standalone: true,
  templateUrl: './address-input.component.html',
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AddressInputComponent),
    multi: true
  }]
})
export class AddressInputComponent implements AfterViewInit, ControlValueAccessor {
  @Output() addressSelected = new EventEmitter<Partial<Address>>();

  @Input() disabled = false;

  inputControl = new FormControl<string>('');

  address = signal<string>("");

  private autocomplete?: google.maps.places.Autocomplete;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.inputControl.setValue(value ?? '', { emitEvent: false });
    this.address.set(value ?? '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngAfterViewInit(): void {
    this.initAutocomplete();
  }

  initAutocomplete() {
    if (this.autocomplete) return;

    const inputEl = document.querySelector('input[placeholder="Adresse suchen..."]') as HTMLInputElement;
    if (!inputEl) return;

    this.autocomplete = new google.maps.places.Autocomplete(inputEl, {
      types: ['address'],
      componentRestrictions: { country: 'de' }
    });

    this.autocomplete.addListener('place_changed', () => {
        const place = this.autocomplete!.getPlace();
        if (!place.address_components) return;

        const address = this.extractAddress(place);
        this.addressSelected.emit(address);
        this.address.set(place.formatted_address ?? '');
        this.onChange(place.formatted_address);
    });
  }

  private extractAddress(place: google.maps.places.PlaceResult): Partial<Address> {
    const get = (type: string) =>
      place.address_components?.find(c => c.types.includes(type))?.long_name || '';

    return {
      street: get('route') + ' ' + get('street_number'),
      city: get('locality') || get('administrative_area_level_2'),
      zipCode: get('postal_code'),
      country: get('country')
    };
  }
}
