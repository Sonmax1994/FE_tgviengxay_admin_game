import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'game',
    pathMatch: 'full'
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    loadComponent: () => import('./layout').then(m => m.DefaultLayoutComponent),
    data: {
      title: 'Game'
    },
    children: [
      {
        path: 'game',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    },
    // canActivate: [LoginGuard],
  },
  { path: '**', redirectTo: 'Game' }
];
