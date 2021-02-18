import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShipsAPIResponse } from '../../../../services/models/ships-api-response.model';
import { Ship } from '../../../../shared/models/ships/ship.model';
declare var $: any;

@Component({
  selector: 'ships-details',
  templateUrl: './ships-details.component.html',
  styleUrls: ['./ships-details.component.scss'],
})
export class ShipsDetailsComponent implements OnInit {
  @Input() set dataList(dataList: ShipsAPIResponse) {
    this._dataList = dataList;
  }
  get dataList() {
    return this._dataList;
  }
  @Output() pageSelected = new EventEmitter<number>();

  public config: any;

  // Modal
  public titleDetails = '';
  public modelDetails = '';
  public starshipClass = '';

  private shipId = '';

  private _dataList: ShipsAPIResponse = null;

  constructor() {}

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.dataList?.count || 0,
    };
  }

  public getStarshipId(url: string): string {
    this.shipId = url.slice(0, -1).split('/').pop();
    const urlImage = `https://starwars-visualguide.com/assets/img/starships/${this.shipId}.jpg`;
    return urlImage;
  }

  public pageChanged(event): void {
    this.config.currentPage = event;
    this.pageSelected.emit(this.config.currentPage);
  }

  public openDetails(details: Ship): void {
    $('#exampleModal').modal('show');
    this.titleDetails = details.name;
    this.modelDetails = details.model;
    this.starshipClass = details.starship_class;
  }
}
