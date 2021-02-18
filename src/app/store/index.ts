import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../environments/environment';
import * as fromShips from './reducers/ships.reducer';

export interface State {
  ships: fromShips.ShipsState;
}

export const reducers: ActionReducerMap<State> = {
  ships: fromShips.reducer,
};

const reducerKeys = ['ships'];

export const localStorageSyncReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return localStorageSync({ keys: reducerKeys })(reducer);
};

// console.log all actions
export const debug = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [debug, localStorageSyncReducer]
  : [localStorageSyncReducer];

// Ships reducers Begin

export const getShipsState = createFeatureSelector<fromShips.ShipsState>('ships');

export const getShips = createSelector(getShipsState, fromShips.getLoadedShips);
