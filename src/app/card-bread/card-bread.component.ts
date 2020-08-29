import { Component, OnInit } from '@angular/core';
// import { finalize } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ModalController } from '@ionic/angular';
import { BreadService, BreadContext } from '@core/bread.service';
import { ResultBreadComponent } from './result-bread.component';
import { range, round } from 'lodash';

interface BreadContextUI extends BreadContext {
  basedOn: 'flour' | 'levain';
}

@Component({
  selector: 'app-card-bread',
  templateUrl: './card-bread.component.html',
  styleUrls: ['./card-bread.component.scss'],
})
export class CardBreadComponent implements OnInit {
  breadForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private breadService: BreadService
  ) {}

  ngOnInit() {
    this.breadForm = this.formBuilder.group({
      ...this.breadService.preference,
      basedOn: 'flour',
      advanced: false,
    });
  }

  getList(min: number, max: number, step: number): number[] {
    return range(min, max + step, step).map((item) => round(item, 1));
  }

  async onSubmit(value: BreadContextUI) {
    const { flour, levain, breadHydration, levainHydration, saltPercent, levainPercent } = value;
    if (value.basedOn === 'flour') {
      value.levain = Math.round((flour * (levainPercent * 1)) / 100);
    } else {
      value.flour = Math.round(levain / ((levainPercent * 1) / 100));
    }

    this.breadService.preference = {
      ...this.breadService.preference,
      flour,
      levain,
      breadHydration,
      saltPercent,
      levainPercent,
    };

    const result = this.breadService.bread(value as BreadContext);
    const modal = await this.modalController.create({
      component: ResultBreadComponent,
      componentProps: result,
      swipeToClose: true,
    });
    return await modal.present();
  }
}
