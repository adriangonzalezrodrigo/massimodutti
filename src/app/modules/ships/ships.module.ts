import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShipsDetailsComponent } from './components/ships-details/ships-details.component';
import { ShipsComponent } from './containers/ships/ships.component';
import { ShipsComponentsRoutingModule } from './ships-routing.module';

@NgModule({
  declarations: [ShipsComponent, ShipsDetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    ShipsComponentsRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
})
export class ShipsModule {}
