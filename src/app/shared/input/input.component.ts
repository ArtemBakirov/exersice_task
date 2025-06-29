import {Component, Input, signal, WritableSignal, effect, computed} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './input.component.html',
})
export class InputComponent{
  @Input() control!: FormControl<any>;

  @Input() inputValue: WritableSignal<string | number | Array<string | number | object>> = signal('');
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'date' | 'select' | "tags" = 'text';
  @Input() errorMessage = 'Dieses Feld ist erforderlich.';
  @Input() options: Array<string> = [];
  @Input() required = false;
  @Input() disabled = false;

  touched = signal(false);
  tempInput = '';

  addTag() {
    const val = this.tempInput.trim();
    if (!val) return;

    const current = Array.isArray(this.inputValue()) ? this.inputValue() as string[] : [];
    this.inputValue.set([...current, val]);
    this.tempInput = '';
  }
  readonly tags = computed(() =>
    Array.isArray(this.inputValue()) ? this.inputValue() as Array<string | number | object> : []
  );

  constructor() {
    effect(() => {
      const val = this.inputValue();
      if (!this.touched() && val !== '') {
        this.touched.set(true);
      }
    });
  }
}
