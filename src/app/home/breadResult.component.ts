import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'modal-page',
  template: `
    <ion-header translucent>
      <ion-toolbar>
        <ion-title translate>Make your bread</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismissModal()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-list>
        <ion-item>
          <ion-label translate>Quantity of Floor </ion-label>
          <ion-note slot="end">{{ floor }} g</ion-note>
        </ion-item>
        <ion-item>
          <ion-label translate>Quantity of water </ion-label>
          <ion-note slot="end">{{ water }} g</ion-note>
        </ion-item>
        <ion-item>
          <ion-label translate>Quantity of levain </ion-label>
          <ion-note slot="end">{{ levain }} g</ion-note>
        </ion-item>
        <ion-item>
          <ion-label translate>Quantity of salt </ion-label>
          <ion-note slot="end">{{ saltMin }} g - {{ saltMax }} g</ion-note>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
})
export class BreadResultComponent {
  // Data passed in by componentProps
  @Input() floor: number;
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
