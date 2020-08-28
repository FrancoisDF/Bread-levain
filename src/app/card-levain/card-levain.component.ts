import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ModalController } from '@ionic/angular';
import { BreadService, LevainContext } from '@core/bread.service';
import { ResultLevainComponent } from './result-levain.component';

export interface LevainContextUI {
  levain: number;
  levainExpected: number;
  levainDoubled: boolean;
  levainHydration: number;
  levainHydrationExpected: number;
  sameHydration: boolean;
}

@Component({
  selector: 'app-card-levain',
  templateUrl: './card-levain.component.html',
  styleUrls: ['./card-levain.component.scss'],
})
export class CardLevainComponent implements OnInit {
  levainForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private breadService: BreadService
  ) {}

  ngOnInit() {
    this.levainForm = this.formBuilder.group({
      levain: 50,
      levainExpected: 100,
      levainDoubled: true,
      levainHydration: 60,
      levainHydrationExpected: 60,
      sameHydration: true,
    });
    this.levainForm.valueChanges.subscribe(() => {
      if (this.levainForm.controls['levain'].value === 'someValue') {
        //
      }
    });
    this.levainForm.get('levain').valueChanges.subscribe((val) => {
      this.levainForm.controls['levainExpected'].setValue(val * 2);
    });
  }
  async onSubmit(value: LevainContextUI) {
    const { levain, levainExpected, levainDoubled, levainHydration, levainHydrationExpected, sameHydration } = value;

    const levainContext: LevainContext = {
      levain,
      levainHydration,
      levainExpected: levainDoubled ? levain * 2 : levainExpected,
      levainHydrationExpected: sameHydration ? levainHydration : levainHydrationExpected,
    };
    const result = this.breadService.levain(levainContext);
    const modal = await this.modalController.create({
      component: ResultLevainComponent,
      componentProps: result,
      swipeToClose: true,
    });
    return await modal.present();
  }
}
