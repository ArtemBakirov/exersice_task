// features/properties/routes.ts
import { Routes } from '@angular/router';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsDetailComponent } from './contacts-detail/contacts-detail.component';

export const CONTACT_ROUTES: Routes = [
  { path: '', component: ContactsListComponent },
  { path: 'new', component: ContactsDetailComponent },
  { path: ':id', component: ContactsDetailComponent }
];
