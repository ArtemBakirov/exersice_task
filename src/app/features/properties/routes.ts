// features/properties/routes.ts
import { Routes } from '@angular/router';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';

export const PROPERTY_ROUTES: Routes = [
  { path: '', component: PropertyListComponent },
  { path: 'new', component: PropertyDetailComponent },
  { path: ':id', component: PropertyDetailComponent }, // for edit or view
];
