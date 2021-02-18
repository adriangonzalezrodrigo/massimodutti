import { Action, createReducer, on } from '@ngrx/store';
import { ShipsAPIResponse } from '../../services/models/ships-api-response.model';
import * as shipsActions from '../actions/ships.actions';
import * as storage from '../state/storage';

export interface ShipsState {
  ships?: ShipsAPIResponse;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
}

export const initialState: ShipsState = {
  ships: storage.getItem('ships').ships,
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false,
};

const shipsReducer = createReducer(
  initialState,

  // GetShips
  on(shipsActions.getShips, (state) => ({
    ...state,
    isLoading: true,
    isLoadingFailure: false,
  })),
  on(shipsActions.getShipsSuccess, (state, result: ShipsAPIResponse) => ({
    ...state,
    ships: result,
    isLoading: false,
    isLoadingSuccess: true,
    isLoadingFailure: false,
  })),
  on(shipsActions.getShipsFailure, (state) => ({
    ...state,
    ships: null,
    isLoading: false,
    isLoadingSuccess: false,
    isLoadingFailure: true,
  }))
);

export const reducer = (
  state: ShipsState | undefined,
  action: Action
): ShipsState => {
  return shipsReducer(state, action);
};

export const getLoadedShips = (state: ShipsState): ShipsState => {
  return {
    ships: state.ships,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess,
    isLoadingFailure: state.isLoadingFailure,
  };
};
