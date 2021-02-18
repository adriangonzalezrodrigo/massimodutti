import { Ship } from '../../shared/models/ships/ship.model';

export interface ShipsAPIResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Ship[];
}
