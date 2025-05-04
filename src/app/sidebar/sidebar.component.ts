import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
role!:string
constructor(public router: Router) {}
isActive(routePrefix: string): boolean {
  return this.router.url.startsWith(routePrefix);
}
}
