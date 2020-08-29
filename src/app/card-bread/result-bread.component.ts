import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'modal-page',
  template: `
    <ion-header translucent>
      <ion-toolbar>
        <ion-title translate>Make your dough</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismissModal()" translate>Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-list>
        <ion-item>
          <ion-label translate>Quantity of flour </ion-label>
          <ion-label color="primary" slot="end">{{ flour }} g</ion-label>
        </ion-item>
        <ion-item>
          <ion-label translate>Quantity of water </ion-label>
          <ion-label color="primary" slot="end">{{ water }} g</ion-label>
        </ion-item>
        <ion-item>
          <ion-label translate>Quantity of levain </ion-label>
          <ion-label color="primary" slot="end">{{ levain }} g</ion-label>
        </ion-item>
        <ion-item>
          <ion-label translate>Quantity of salt </ion-label>
          <ion-label color="primary" slot="end">{{ saltMin }} g - {{ saltMax }} g</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
})
export class ResultBreadComponent {
  // Data passed in by componentProps
  @Input() flour: number;
  @Input() saltMin: number;
  @Input() saltMax: number;
  @Input() water: number;
  @Input() levain: number;

  constructor(private modalCtrl: ModalController) {}

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
