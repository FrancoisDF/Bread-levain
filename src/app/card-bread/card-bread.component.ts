import { Component, OnInit } from '@angular/core';
// import { finalize } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ModalController } from '@ionic/angular';
import { BreadService, BreadContext } from '@core/bread.service';
import { ResultBreadComponent } from './result-bread.component';

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
      floor: 400,
      breadHydration: 60,
      saltPercent: 2.8,
      levainHydration: 60,
      levainPercent: 30,
      advanced: false,
    });
  }
  async onSubmit(value: BreadContext) {
    const result = this.breadService.bread(value);
    const modal = await this.modalController.create({
      component: ResultBreadComponent,
      componentProps: result,
      swipeToClose: true,
    });
    return await modal.present();
  }
}
