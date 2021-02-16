import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from '@shared/constants';
import { LoginComponent } from './containers/login/login.component';

const routes: Routes = [
  { path: APP_ROUTES.ROOT.path, component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
