import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShipsAPIResponse } from '../../../../services/models/ships-api-response.model';
import { ShipsParams } from '../../../../services/models/ships-params.model';
import * as fromRoot from '../../../../store';
import * as shipsActions from '../../../../store/actions/ships.actions';
import { ShipsState } from '../../../../store/reducers/ships.reducer';

const FIRST_PAGE = 1;

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
})
export class ShipsComponent implements OnInit, OnDestroy {
  public dataList: ShipsAPIResponse = null;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store
      .select(fromRoot.getShips)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ShipsState) => {
        this.dataList = data.ships;
      });

    this.fetchData();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public fetchData(page = FIRST_PAGE): void {
    const shipsParams: ShipsParams = {
      page,
    };
    this.store.dispatch(shipsActions.getShips(shipsParams));
  }
}
