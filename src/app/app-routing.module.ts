import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./modules/login/login.module`).then((m) => m.LoginModule),
  },
  { path: 'register',
  loadChildren: () => import(`./modules/register/register.module`).then((m) => m.RegisterModule), },
  {
    path: 'principal',
    loadChildren: () => import(`./modules/principal/principal.module`).then((m) => m.PrincipalModule),
  },
  {
    path: '**',
    redirectTo: '' // TODO: Replace with Page Not Found
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
