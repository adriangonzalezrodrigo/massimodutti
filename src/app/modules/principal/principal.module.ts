import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageOneComponent } from './components/page-one/page-one.component';
import { PageTwoComponent } from './components/page-two/page-two.component';
import { PrincipalComponent } from './containers/principal/principal.component';
import { PrincipalComponentsRoutingModule } from './principal-routing.module';

@NgModule({
  declarations: [PageOneComponent, PageTwoComponent, PrincipalComponent],
  imports: [CommonModule, RouterModule, PrincipalComponentsRoutingModule],
})
export class PrincipalModule {}
