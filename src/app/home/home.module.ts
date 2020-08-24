import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { Angulartics2Module } from 'angulartics2';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ResultBreatComponent } from './resultBread.component';
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
  ],
  declarations: [HomeComponent],
  entryComponents: [ResultBreatComponent],
})
export class HomeModule {}
