import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ShipsService } from '../../shared/';
import { ShipsAPIResponse } from '../../shared/services/ships/models/ships-api-response.model';
import { ShipsParams } from '../../shared/services/ships/models/ships-params.model';
import * as shipsActions from '../actions/ships.actions';

@Injectable()
export class ShipsEffects {
  constructor(private actions$: Actions, private shipsService: ShipsService) {}

  private getShips$ = createEffect(() =>
    this.actions$.pipe(
      ofType(shipsActions.getShips),
      exhaustMap((action: ShipsParams) =>
        this.shipsService.getShips(action).pipe(
          map((response: ShipsAPIResponse) => {
            return shipsActions.getShipsSuccess(response);
          }),
          catchError((error: any) => of(shipsActions.getShipsFailure(error)))
        )
      )
    )
  );
}
