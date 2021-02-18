import { createAction, props } from '@ngrx/store';
import { ShipsParams } from '../../services/models/ships-params.model';

export const GET_SHIPS = '[Ships] Get Ships';
export const GET_SHIPS_SUCCESS = '[Ship] Get Ships Success';
export const GET_SHIPS_FAILURE = '[Ship] Get Ships Failure';

export const getShips = createAction(GET_SHIPS, props<ShipsParams>());

export const getShipsSuccess = createAction(GET_SHIPS_SUCCESS, props<any>());

export const getShipsFailure = createAction(
  GET_SHIPS_FAILURE,
  props<{ any }>()
);
