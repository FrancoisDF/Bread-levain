import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';

export interface BreadContext {
  floor: number;
  breadHydration: number;
  levainHydration: number;
  saltPercent: number;
  levainPercent: number;
}

export interface RecipeBreadContext {
  floor: number;
  saltMin: number;
  saltMax: number;
  water: number;
  levain: number;
}

export interface LevainContext {
  levain: number;
  levainExpected: number;
  levainHydration: number;
  levainHydrationExpected: number;
}

export interface RecipeLevainContext {
  floor: number;
  water: number;
}

@Injectable({
  providedIn: 'root',
})
export class BreadService {
  constructor() {}

  bread(ctx: BreadContext): RecipeBreadContext {
    console.log('Calculate :', ctx);
    const levainPercent = (ctx.levainPercent * 1) / 100;
    const saltPercent = (ctx.saltPercent * 1) / 100;
    const levainHydrationPercent = (ctx.levainHydration * 1) / 100;
    const breadHydrationPercent = (ctx.breadHydration * 1) / 100;
    const floor = ctx.floor;
    const levain = floor * levainPercent;
    //  ($B$4 + $D$5 * (1/(1+ $B$7 )))* $B$5-$D$5*(1-(1/(1+$B$7)))
    const water =
      (floor + levain * (1 / (1 + levainHydrationPercent))) * breadHydrationPercent -
      levain * (1 - 1 / (1 + levainHydrationPercent));
    const saltMin = Math.ceil(saltPercent * water);
    // (($B$4+$D$5*(1/(1+$B$7)))*$B$5)*$B$6
    const saltMax = Math.round(
      (floor + levain * (1 / (1 + levainHydrationPercent))) * breadHydrationPercent * saltPercent
    );
    return {
      floor,
      levain,
      water: Math.round(water),
      saltMin,
      saltMax,
    };
  }

  levain(ctx: LevainContext): RecipeLevainContext {
    const { levain, levainExpected, levainHydration, levainHydrationExpected } = ctx;

    const waterStart = (levainHydration / (100 + levainHydration)) * levain;
    const floorStart = (100 / (100 + levainHydration)) * levain;
    const waterEnd = (levainHydrationExpected / (100 + levainHydrationExpected)) * levainExpected - waterStart;
    const floorEnd = (100 / (100 + levainHydrationExpected)) * levainExpected - floorStart;

    return {
      water: waterEnd,
      floor: floorEnd,
    };
  }
}
