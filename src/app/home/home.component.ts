import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BreadService, BreadContext } from '../@core/bread.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  quote: string | undefined;
  isLoading = false;
}
