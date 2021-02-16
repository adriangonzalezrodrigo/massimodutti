import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipsComponent } from '../ships/containers/ships/ships.component';
import { PageOneComponent } from './components/page-one/page-one.component';
import { PageTwoComponent } from './components/page-two/page-two.component';
import { PrincipalComponent } from './containers/principal/principal.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    children: [
      { path: 'ships', loadChildren: () => import(`../ships/ships.module`).then(m => m.ShipsModule) },
      { path: 'pageOne', component: PageOneComponent },
      { path: 'pageTwo', component: PageTwoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalComponentsRoutingModule {}
