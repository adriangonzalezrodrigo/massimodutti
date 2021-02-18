import { Ship } from '../../../models/ships/ship.model';

export interface ShipsAPIResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Ship[];
}
