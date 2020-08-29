import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ModalController } from '@ionic/angular';
import { BreadService, LevainContext } from '@core/bread.service';
import { ResultLevainComponent } from './result-levain.component';
import { range, round } from 'lodash';
import { Subscription } from 'rxjs';

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
export class CardLevainComponent implements OnInit, OnDestroy {
  levainForm: FormGroup;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private breadService: BreadService
  ) {}

  ngOnInit() {
    const pref = this.breadService.preference;
    this.levainForm = this.formBuilder.group({
      levain: 50,
      levainExpected: 100,
      levainDoubled: true,
      levainHydration: pref.levainHydration,
      levainHydrationExpected: pref.levainHydration,
      sameHydration: true,
    });
    this.subscription = this.levainForm.get('levain').valueChanges.subscribe((val) => {
      this.levainForm.controls['levainExpected'].setValue(val * 2);
    });
  }

  getList(min: number, max: number, step: number): number[] {
    return range(min, max + step, step).map((item) => round(item, 1));
  }

  async onSubmit(value: LevainContextUI) {
    const { levain, levainExpected, levainDoubled, levainHydrationExpected, sameHydration } = value;

    if (!sameHydration) {
      this.breadService.preference = {
        ...this.breadService.preference,
        levainHydration: levainHydrationExpected,
      };
    }

    const levainHydration = this.breadService.preference.levainHydration;

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
