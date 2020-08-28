import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';

const preferenceKey = 'preference';

export interface BreadContext {
  flour: number;
  levain: number;
  breadHydration: number;
  levainHydration: number;
  saltPercent: number;
  levainPercent: number;
}

export interface RecipeBreadContext {
  flour: number;
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
  flour: number;
  water: number;
}

@Injectable({
  providedIn: 'root',
})
export class BreadService {
  defaultPreference: BreadContext = {
    flour: 400,
    levain: 100,
    breadHydration: 60,
    saltPercent: 2.8,
    levainHydration: 60,
    levainPercent: 30,
  };

  constructor() {}

  bread(ctx: BreadContext): RecipeBreadContext {
    const { flour, levain } = ctx;

    const saltPercent = (ctx.saltPercent * 1) / 100;
    const levainHydrationPercent = (ctx.levainHydration * 1) / 100;
    const breadHydrationPercent = (ctx.breadHydration * 1) / 100;
    //  ($B$4 + $D$5 * (1/(1+ $B$7 )))* $B$5-$D$5*(1-(1/(1+$B$7)))
    const water =
      (flour + levain * (1 / (1 + levainHydrationPercent))) * breadHydrationPercent -
      levain * (1 - 1 / (1 + levainHydrationPercent));
    const saltMin = Math.ceil(saltPercent * water);
    // (($B$4+$D$5*(1/(1+$B$7)))*$B$5)*$B$6
    const saltMax = Math.round(
      (flour + levain * (1 / (1 + levainHydrationPercent))) * breadHydrationPercent * saltPercent
    );
    return {
      flour,
      levain,
      water: Math.round(water),
      saltMin,
      saltMax,
    };
  }

  levain(ctx: LevainContext): RecipeLevainContext {
    const { levain, levainExpected, levainHydration, levainHydrationExpected } = ctx;

    const waterStart = (levainHydration / (100 + levainHydration)) * levain;
    const flourStart = (100 / (100 + levainHydration)) * levain;
    const waterEnd = (levainHydrationExpected / (100 + levainHydrationExpected)) * levainExpected - waterStart;
    const flourEnd = (100 / (100 + levainHydrationExpected)) * levainExpected - flourStart;

    return {
      water: waterEnd,
      flour: flourEnd,
    };
  }

  /**
   * save preferences.
   */
  set preference(pref: BreadContext) {
    localStorage.setItem(preferenceKey, JSON.stringify(pref));
  }

  /**
   * Gets the current preferences.
   */
  get preference(): BreadContext {
    const pref = localStorage.getItem(preferenceKey);

    return pref ? JSON.parse(pref) : this.defaultPreference;
  }
}
