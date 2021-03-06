import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from '@shared/constants';
import { ShipsComponent } from './containers/ships/ships.component';

const routes: Routes = [
  {
    path: APP_ROUTES.ROOT.path,
    component: ShipsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipsComponentsRoutingModule {}
