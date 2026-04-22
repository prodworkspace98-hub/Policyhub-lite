import { Routes } from '@angular/router';
import { ShellComponent } from './core/layout/shell/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'policies',
        loadComponent: () =>
          import('./features/policies/policies.component').then(
            (m) => m.PoliciesComponent,
          ),
      },
      {
        path: 'clients',
        loadComponent: () =>
          import('./features/clients/clients.component').then(
            (m) => m.ClientsComponent,
          ),
      },
    ],
  },
];
