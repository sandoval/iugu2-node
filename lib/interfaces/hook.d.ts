import { Identifier } from './object';
export interface Hook extends Identifier {
    url?: string;
    event?: string;
}
