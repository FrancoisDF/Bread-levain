import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ResultLevainComponent } from './result-levain.component';
import { CardLevainComponent } from './card-levain.component';
import { CoreModule } from '@core';

@NgModule({
  imports: [CommonModule, CoreModule, ReactiveFormsModule, IonicModule, TranslateModule],
  declarations: [CardLevainComponent, ResultLevainComponent],
  entryComponents: [ResultLevainComponent],
  exports: [CardLevainComponent],
})
export class CardLevainModule {}
