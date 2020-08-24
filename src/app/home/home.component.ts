import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BreadService, BreadContext } from './bread.service';
import { BreadResultComponent } from './breadResult.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  breadForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private breadService: BreadService
  ) {
    this.breadForm = this.formBuilder.group({
      floor: 400,
      breadHumidity: 50,
      saltPercent: 2.5,
      levainHumidity: 60,
      levainPercent: 40,
    });
  }

  ngOnInit() {}
  async onSubmit(value: BreadContext) {
    const result = this.breadService.calculate(value);
    const modal = await this.modalController.create({
      component: BreadResultComponent,
      componentProps: result,
    });
    return await modal.present();
  }
}
