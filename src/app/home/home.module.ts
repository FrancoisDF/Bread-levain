import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { Angulartics2Module } from 'angulartics2';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CardLevainModule } from '../card-levain/card-levain.module';
import { CardBreadModule } from '../card-bread/card-bread.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    IonicModule,
    Angulartics2Module,
    HomeRoutingModule,
    CardLevainModule,
    CardBreadModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
