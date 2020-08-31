import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'modal-page',
  template: `
    <ion-header translucent>
      <ion-toolbar>
        <ion-title translate>Definition</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismissModal()" translate>Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item-group>
          <ion-item-divider>
            <ion-label translate>Levain hydration</ion-label>
          </ion-item-divider>
          <ion-item lines="none" style="padding: 4px;" translate>
            Levain hydration definition
          </ion-item>
        </ion-item-group>
        <ion-item-group>
          <ion-item-divider>
            <ion-label translate>Dough hydration</ion-label>
          </ion-item-divider>
          <ion-item lines="none" style="padding: 4px;" translate>
            Dough hydration definition
          </ion-item>
        </ion-item-group>
      </ion-list>
    </ion-content>
  `,
})
export class DefinitionComponent {
  // Data passed in by componentProps

  constructor(private modalCtrl: ModalController) {}

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
