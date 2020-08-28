import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { ResultBreadComponent } from './result-bread.component';
import { CardBreadComponent } from './card-bread.component';
import { CoreModule } from '@core';

@NgModule({
  imports: [CommonModule, CoreModule, IonicModule, ReactiveFormsModule],
  declarations: [CardBreadComponent, ResultBreadComponent],
  entryComponents: [ResultBreadComponent],
  exports: [CardBreadComponent],
})
export class CardBreadModule {}
