import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface BreadContext {
  floor: number;
  breadHumidity: number;
  levainHumidity: number;
  saltPercent: number;
  levainPercent: number;
}

export interface RecipeContext {
  floor: number;
  saltMin: number;
  saltMax: number;
  water: number;
  levain: number;
}

@Injectable({
  providedIn: 'root',
})
export class BreadService {
  constructor() {}

  calculate(ctx: BreadContext): RecipeContext {
    console.log('Calculate :', ctx);
    const levainPercent = (ctx.levainPercent * 1) / 100;
    const saltPercent = (ctx.saltPercent * 1) / 100;
    const levainHumidityPercent = (ctx.levainHumidity * 1) / 100;
    const breadHumidityPercent = (ctx.breadHumidity * 1) / 100;
    const floor = ctx.floor;
    const levain = floor * levainPercent;
    //  ($B$4 + $D$5 * (1/(1+ $B$7 )))* $B$5-$D$5*(1-(1/(1+$B$7)))
    const water =
      (floor + levain * (1 / (1 + levainHumidityPercent))) * breadHumidityPercent -
      levain * (1 - 1 / (1 + levainHumidityPercent));
    const saltMin = Math.ceil(saltPercent * water);
    // (($B$4+$D$5*(1/(1+$B$7)))*$B$5)*$B$6
    const saltMax = Math.round(
      (floor + levain * (1 / (1 + levainHumidityPercent))) * breadHumidityPercent * saltPercent
    );
    return {
      floor,
      levain,
      water: Math.round(water),
      saltMin,
      saltMax,
    };
  }
}
