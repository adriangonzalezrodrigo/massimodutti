import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from '@shared/constants';
import { PageOneComponent } from './components/page-one/page-one.component';
import { PageTwoComponent } from './components/page-two/page-two.component';
import { PrincipalComponent } from './containers/principal/principal.component';

const routes: Routes = [
  {
    path: APP_ROUTES.ROOT.path,
    component: PrincipalComponent,
    children: [
      {
        path: APP_ROUTES.SHIPS.path,
        loadChildren: () =>
          import(`../ships/ships.module`).then((m) => m.ShipsModule),
      },
      { path: APP_ROUTES.PAGE_ONE.path, component: PageOneComponent },
      { path: APP_ROUTES.PAGE_TWO.path, component: PageTwoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalComponentsRoutingModule {}
