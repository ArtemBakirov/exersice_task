import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  router = inject(Router);

  navItems = [
    { label: 'Immobilien', icon: 'folder_open', link: '/properties' },
    { label: 'Kontakte', icon: 'person_outline', link: '/contacts' },
    { label: 'Beziehungen', icon: 'favorite_border', link: '/relations' },
  ];

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
