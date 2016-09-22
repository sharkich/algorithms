import {Zone} from './zone';

export class POD {
    public id: string;
    public zone: Zone;
    public goalZone: Zone;
    public path = [];

    constructor(id: string, zone: Zone, goalZone: Zone = void 0) {
        this.id = id;
        this.zone = zone;
        this.goalZone = goalZone;
    }
}
