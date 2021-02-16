import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from '@shared/constants';

const routes: Routes = [
  {
    path: APP_ROUTES.ROOT.path,
    loadChildren: () =>
      import(`./modules/login/login.module`).then((m) => m.LoginModule),
  },
  {
    path: APP_ROUTES.REGISTER.path,
    loadChildren: () =>
      import(`./modules/register/register.module`).then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: APP_ROUTES.PRINCIPAL.path,
    loadChildren: () =>
      import(`./modules/principal/principal.module`).then(
        (m) => m.PrincipalModule
      ),
  },
  {
    path: APP_ROUTES.WILDCARD.path,
    redirectTo: '', // TODO: Replace with Page Not Found
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
