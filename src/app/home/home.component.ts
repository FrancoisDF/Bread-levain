import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BreadService, BreadContext } from '../@core/bread.service';
import { range, round } from 'lodash';
import { Subscription } from 'rxjs';
import { DefinitionComponent } from './definition.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
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
      levainHydration: pref.levainHydration,
    });

    this.subscription = this.levainForm.get('levainHydration').valueChanges.subscribe((levainHydration) => {
      this.breadService.preference = {
        ...this.breadService.preference,
        levainHydration,
      };
    });
  }

  getList(min: number, max: number, step: number): number[] {
    return range(min, max + step, step).map((item) => round(item, 1));
  }

  async openDefinition() {
    const modal = await this.modalController.create({
      component: DefinitionComponent,
      swipeToClose: true,
    });
    return await modal.present();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
