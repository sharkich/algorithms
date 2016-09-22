import {Zone} from './zone';

export class Game {
    public playerID:number;
    public enemyID:number;

    public zonesAmount:number;
    public linksAmount:number;

    public zones: Zone[] = [];

    constructor(playerID:number, enemyID:number, zonesAmount:number, linksAmount:number) {
        this.playerID = playerID;
        this.enemyID = enemyID;
        this.zonesAmount = zonesAmount;
        this.linksAmount = linksAmount;
    }

    addZone(zone: Zone) {
        if (!this.zones[zone.id]) {
            this.zones[zone.id] = zone;
        }
    }

    addZoneLink(zone1ID: number, zone2ID: number) {
        this.addZone(new Zone(zone1ID));
        this.addZone(new Zone(zone2ID));

        this.zones[zone1ID].addLink(zone2ID);
        this.zones[zone2ID].addLink(zone1ID);
    }

    updateZone(zoneID: number,
           owner: number,
           pods0: number,
           pods1: number,
           isVisible: boolean,
           platinum: number) {
        this.zones[zoneID].update(owner, pods0, pods1, isVisible, platinum);
    }
}
