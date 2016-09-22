import {Zone} from './zone';
import {POD} from './pod';

export class Game {
    public playerID:number;
    public enemyID:number;

    public zonesAmount:number;
    public linksAmount:number;

    public zones: Zone[] = [];
    public pods: POD[] = [];

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
        let playerPODs = this.playerID ? pods1 : pods0;
        let playerPODsInZone = this.playerPODsInZone(this.zones[zoneID]);

        if (playerPODsInZone > playerPODs) {
            for (let i = playerPODsInZone - playerPODs; i--;) {
                this.removePODFromZone(this.zones[zoneID]);
            }

        } else if (playerPODs > playerPODsInZone) {
            for (let i = playerPODs - playerPODsInZone; i--;) {
                this.addPODInZone(this.zones[zoneID]);
            }
        }
    }

    playerPODsInZone(zone: Zone): number {
        return this.pods.reduce((sum: number, pod: POD) => {
            return sum + (pod.zone.id === zone.id ? 1 : 0)
        }, 0);
    }

    addPODInZone(zone: Zone): POD {
        const id = `${zone.id}.${this.pods.length + 1}`;
        let pod = new POD(id, zone);
        // printErr(`++ born pod #${id}`);
        this.pods.push(pod);
        return pod;
    }

    removePODFromZone(zone: Zone): POD {
        let index = this.pods.findIndex((pod: POD) => {
            return pod.zone.id === zone.id;
        });
        let pod = this.pods[index];
        // printErr(`-- kill pod #${this.pods[index].id}`);
        this.pods.splice(index, 1);
        return pod;
    }

    initGoalZoneForPOD(pod: POD): Zone {
        let index: number;
        // for (index = Math.floor(Math.random() * Object.keys(this.zones).length) + 1; index === pod.zone.id;) {}
        index = Math.floor(Math.random() * pod.zone.links.length);

        pod.path.length = 0;
        pod.path.push([pod.zone.id, pod.zone.links[index]]);

        return this.zones[pod.zone.links[index]];
    }

    go(): string {
        let moves = {};

        this.pods.forEach((pod: POD) => {
            if (!pod.goalZone || !pod.path.length) {
                pod.goalZone = this.initGoalZoneForPOD(pod);
            }
            let move = pod.move();
            if (!moves[move]) {
                moves[move] = {
                    from: move[0],
                    to: move[1],
                    count: 0,
                };
            }
            moves[move].count++;
        });
        // printErr(`moves: ${JSON.stringify(moves)}`);

        let result = '';
        Object.keys(moves).forEach((key) => {
            result += `${moves[key].count} ${moves[key].from} ${moves[key].to} `;
        });
        return result;
    }
}
