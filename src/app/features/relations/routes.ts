// features/properties/routes.ts
import { Routes } from '@angular/router';
import { RelationListComponent } from './relation-list/relation-list.component';
import { RelationDetailComponent } from './relation-detail/relation-detail.component';

export const RELATION_ROUTES: Routes = [
  { path: '', component: RelationListComponent },
  { path: 'new', component: RelationDetailComponent },
  { path: ':id', component: RelationDetailComponent },
];
