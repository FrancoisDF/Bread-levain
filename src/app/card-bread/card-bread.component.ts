import { Component, OnInit } from '@angular/core';
// import { finalize } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ModalController } from '@ionic/angular';
import { BreadService, BreadContext } from '@core/bread.service';
import { ResultBreadComponent } from './result-bread.component';

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
      flour: 400,
      levain: 100,
      basedOn: 'flour',
      breadHydration: 60,
      saltPercent: 2.8,
      levainHydration: 60,
      levainPercent: 30,
      advanced: false,
    });
  }
  async onSubmit(value: BreadContextUI) {
    if (value.basedOn === 'flour') {
      value.levain = Math.round((value.flour * (value.levainPercent * 1)) / 100);
    } else {
      value.flour = Math.round(value.levain / ((value.levainPercent * 1) / 100));
    }

    const result = this.breadService.bread(value as BreadContext);
    const modal = await this.modalController.create({
      component: ResultBreadComponent,
      componentProps: result,
      swipeToClose: true,
    });
    return await modal.present();
  }
}
