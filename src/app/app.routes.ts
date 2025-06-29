import { Routes } from '@angular/router';
import { CONTACT_ROUTES } from './features/contacts/routes';
import { PROPERTY_ROUTES } from './features/properties/routes';
import { RELATION_ROUTES } from './features/relations/routes';
import {LayoutComponent} from './layout/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'properties', children: PROPERTY_ROUTES },
      { path: 'contacts', children: CONTACT_ROUTES },
      { path: 'relations', children: RELATION_ROUTES },
      { path: '', redirectTo: 'properties', pathMatch: 'full' }
    ]
  }
];

// lazy loading?
