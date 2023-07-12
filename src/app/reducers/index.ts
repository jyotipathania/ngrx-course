import { isDevMode } from '@angular/core';
import { routerReducer } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

export const appFeatureKey = 'app';

export interface AppState {

}

//Creating custom metareducer
export function logger(reducer: ActionReducer<any>): ActionReducer<any>{
    return (state, action) => {
      console.log("State before: ", state);
      console.log("action: ", action);

      return reducer(state, action)
    }
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [logger] : [];
