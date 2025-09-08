import { Component } from '@angular/core';
import { LoaderService } from '../../core/services/loader.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SpinnerComponent,
} from '@coreui/angular';
import { CommonModule } from '@angular/common';

import { DefaultHeaderComponent } from './';
import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  imports: [
    CommonModule,
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    ContainerComponent,
    DefaultHeaderComponent,
    NgScrollbar,
    RouterOutlet,
    RouterLink,
    ShadowOnScrollDirective,
    SpinnerComponent
  ]
})
export class DefaultLayoutComponent {
  public navItems = [...navItems];
  constructor(public loaderService: LoaderService) {}
}
