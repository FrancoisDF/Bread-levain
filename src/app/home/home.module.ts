import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { Angulartics2Module } from 'angulartics2';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DefinitionComponent } from './definition.component';
import { CardLevainModule } from '../card-levain/card-levain.module';
import { CardBreadModule } from '../card-bread/card-bread.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    IonicModule,
    Angulartics2Module,
    ReactiveFormsModule,
    HomeRoutingModule,
    CardLevainModule,
    CardBreadModule,
  ],
  declarations: [HomeComponent, DefinitionComponent],
  entryComponents: [DefinitionComponent],
})
export class HomeModule {}
