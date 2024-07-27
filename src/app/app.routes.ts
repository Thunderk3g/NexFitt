import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./main-screen/main-screen.module').then(m => m.MainScreenModule) },
];
