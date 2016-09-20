class Pod {
    constructor(options) {
        this.id = options.id;
        this.zone = options.zone;
        this.goalZone = undefined;
        this.steps = [];
    }

    get owner() {
        return this.zone.owner;
    }

    move() {

        if (!this.goalZone || !this.steps.length) {
            this.goalZone = zones[PodsList.getRandomZone(zones, this.zone)];
            this.steps = PodsList.buildPath(zones, this.zone, this.goalZone);
            printErr(`~~ create goal #${this.goalZone.id} for zone #${this.id}`);
        }
        printErr(`~~ move pod #${this.id}, step #${this.steps[0]}`);
    }
}
// =============================================================================================
class PodsList {
    constructor() {
        this.pods = [];
    }

    podsInZone(zone, owner = GAME_CONF.MY_ID) {
        return this.pods.reduce((sum, pod) => {
            return sum + (pod && pod.owner === owner && pod.zone.id === zone.id ? 1 : 0)
        }, 0);
    }

    addPodInZone(zone) {
        const id = `${zone.id}.${this.pods.length + 1}`;
        this.pods.push(new Pod({
            id,
            zone
        }));
        printErr(`++ new pod #${id}`);
    }

    removePodFromZone(zone) {
        let index = this.pods.findIndex((pod) => {
            return pod.zone.id === zone.id;
        });
        printErr(`-- kill pod #${this.pods[index].id}`);
        this.pods.splice(index, 1);
    }

    moveAll() {
        this.pods.forEach((pod) => {
            pod.move();
        });
    }

    static getRandomZone(zones, zone) {
        let result;
        for (result = Math.floor(Math.random() * Object.keys(zones).length) + 1; result === zone.id;) {}
        return result;
    }

    static buildPath(zones, zoneFrom, zoneTo) {
        printErr(`@buildPath #${zoneFrom.id}->${zoneTo.id}`);

        const markZones = (zones, zoneFrom, zoneTo, step = 1) => {
            // printErr(`@markZones #${zoneFrom.id}->${zoneTo.id}, step#${step}`);
            zoneTo.links.forEach((zoneId) => {
                if (!zones[zoneId].step) {
                    zones[zoneId].step = step;
                    // printErr(`@step mark #${zoneTo.id}->#${_zone.id} === ${step}`);
                }
            });
            zoneTo.links.forEach((zoneId) => {
                if (zones[zoneId].step === step) {// + 1 && [zoneFrom.id, zoneTo.id].indexOf(_zone.id) !== -1
                    markZones(zones, zoneFrom, zones[zoneId], step + 1);
                }
            });
        };

        let _zones = Object.assign({}, zones);

        markZones(_zones, zoneFrom, zoneTo, 1);

        const _buildPath = (zones, zoneFrom, zoneTo, step = 1) => {
            // for debug
            let ids = zoneTo.links.reduce((s, zoneId) => {
                return s + `${zones[zoneId].id}|`;
            }, '');
            printErr(`@_buildPath:  #${step} ${zoneFrom.id}->${zoneTo.id} (${ids})`);
            let next = zoneTo.links.find((zoneId) => {
                return zones[zoneId].step === step;
            });
            if (!next) {
                printErr(`O_o: ${step}`);
                return [];
            }
            if (next.id === zoneFrom.id) {
                return next;
            }
            return [next].concat(_buildPath(zones, zoneFrom, next, step + 1));
        };

        let result = _buildPath(_zones, zoneFrom, zoneTo);

        let _s = result.reduce((s, _zone) => {
            return s + `${_zone.id}|`;
        }, '');
        printErr(`@_s: ${JSON.stringify(_s)}`);

        let _ss = zoneFrom.links.reduce((s, zoneId) => {
            return s + `${zones[zoneId].id}|`;
        }, '');
        printErr(`@zoneFrom: ${JSON.stringify(_ss)}`);


        let _sss = zoneTo.links.reduce((s, zoneId) => {
            return s + `${zones[zoneId].id}|`;
        }, '');
        printErr(`@zoneTo: ${JSON.stringify(_sss)}`);

        printErr(`@result: ${JSON.stringify(result)}`);
        printErr(`@_zones: ${JSON.stringify(_zones)}`);

        return result;
    }
}
// =============================================================================================
class Zone {
    constructor(options) {
        this.id = options.id;
        this.platinum = options.platinum;
        this.pods = [0, 0];
        this.owner = undefined;
        this.isVisible = undefined;
        this.links = [];
    }

    update(options) {
        this.owner = options.owner;
        this.pods = options.pods;
        this.isVisible = options.isVisible;
        this.platinum = options.platinum;

        const podsInZone = podsList.podsInZone(this);
        if (podsInZone > this.pods[GAME_CONF.MY_ID]) {
            for (let i = this.pods[GAME_CONF.MY_ID] - podsInZone; i--;) {
                podsList.removePodFromZone(this);
            }

        } else if (this.pods[GAME_CONF.MY_ID] > podsInZone) {
            for (let i = this.pods[GAME_CONF.MY_ID] - podsInZone; i--;) {
                podsList.addPodInZone(this);
            }
        }
    }

    addLink(zone) {
        this.links.push(zone.id);
    }

    get neighborhoods() {
        return this.links.length;
    }

    get isHasMyPods() {
        return this.pods[GAME_CONF.MY_ID] > 0;
    }

    get isHasEnemyPods() {
        return this.pods[GAME_CONF.ENEMY_ID] > 0;
    }

    get isMyZone() {
        return this.id === GAME_CONF.MY_ID;
    }
}
// =============================================================================================

printErr(`~~~~~~~~~~~~~~~~~~ STEP #0 ~~~~~~~~~~~~~~~~~~`);

const INPUTS_GLOBAL = readline().split(' ');

const GAME_CONF = {
    PLAYERS: parseInt(INPUTS_GLOBAL[0]), // === 2
    MY_ID: parseInt(INPUTS_GLOBAL[1]), // my player ID (0 or 1)
    ZONE_AMOUNT: parseInt(INPUTS_GLOBAL[2]), // the amount of zones on the map
    LINK_AMOUNT: parseInt(INPUTS_GLOBAL[3]), // the amount of links between all zones
    ENEMY_ID: undefined
};
GAME_CONF.ENEMY_ID = GAME_CONF.MY_ID === 1 ? 0 : 1;

printErr(`GAME_CONF: ${JSON.stringify(GAME_CONF)}`);

// =============================================================================================

let steps = 0;

const zones = {};
const podsList = new PodsList();

let myBase = undefined;
let enemyBase = undefined;

// =============================================================================================

// Init Zones
for (let i = 0; i < GAME_CONF.ZONE_AMOUNT; i++) {
    const INPUTS = readline().split(' ');

    const ZONE_ID = parseInt(INPUTS[0]); // this zone's ID (between 0 and ZONE_COUNT-1)

    zones[ZONE_ID] = new Zone({
        id: ZONE_ID,
        platinum: parseInt(INPUTS[1]) // Because of the fog, will always be 0
    });
}

// Init Links
for (let i = 0; i < GAME_CONF.LINK_AMOUNT; i++) {
    const INPUTS = readline().split(' ');

    const ZONE1 = parseInt(INPUTS[0]);
    const ZONE2 = parseInt(INPUTS[1]);

    zones[ZONE1].addLink(zones[ZONE2]);
    zones[ZONE2].addLink(zones[ZONE1]);
}

// printErr(`all zones: ${JSON.stringify(zones)}`);

// =============================================================================================

// for debug
let _zonesStat = {};
Object.keys(zones).forEach((key) => {
    let zone = zones[key];
    _zonesStat[zone.neighborhoods] = _zonesStat[zone.neighborhoods] || 0;
    _zonesStat[zone.neighborhoods]++;
});
printErr(`_zonesStat.amountNeighborhoods: ${JSON.stringify(_zonesStat)}`);

_zonesStat = {};
Object.keys(zones).forEach((key) => {
    let zone = zones[key];
    _zonesStat[zone.pods] = _zonesStat[zone.pods] || 0;
    _zonesStat[zone.pods]++;
});
printErr(`_zonesStat.amountPods: ${JSON.stringify(_zonesStat)}`);

// =============================================================================================

// Game Loop
while (true) {
    steps++;
    printErr(`~~~~~~~~~~~~~~~~~~ STEP #${steps} ~~~~~~~~~~~~~~~~~~`);

    const MY_PLATINUM = parseInt(readline()); // your available Platinum
    printErr(`MY_PLATINUM === ${MY_PLATINUM}`);

    for (let i = 0; i < GAME_CONF.ZONE_AMOUNT; i++) {
        const INPUTS = readline().split(' ');
        const ZONE_CONF = {
            ZONE_ID: parseInt(INPUTS[0]), // this zone's ID
            ZONE_OWNER_ID: parseInt(INPUTS[1]), // the player who owns this zone (-1 otherwise)
            PODS_P0_IN_ZONE: parseInt(INPUTS[2]), // player 0's PODs on this zone
            PODS_P1_IN_ZONE: parseInt(INPUTS[3]), // player 1's PODs on this zone
            IS_VISIBLE_ZONE: parseInt(INPUTS[4]), // 1 if one of your units can see this tile, else 0
            PLATINUM_AMOUNT: parseInt(INPUTS[5]) // the amount of Platinum this zone can provide (0 if hidden by
        };


        let zone = zones[ZONE_CONF.ZONE_ID];
        zone.update({
            owner: ZONE_CONF.ZONE_OWNER_ID,
            pods: [ZONE_CONF.PODS_P0_IN_ZONE, ZONE_CONF.PODS_P1_IN_ZONE],
            isVisible: ZONE_CONF.IS_VISIBLE_ZONE,
            platinum: ZONE_CONF.PLATINUM_AMOUNT
        });

        if (myBase === undefined && zone.isHasMyPods) {
            myBase = zone;
            printErr(`find.myBase: ${myBase.id}`);
        }

        if (enemyBase === undefined && zone.isHasEnemyPods) {
            enemyBase = zone;
            printErr(`find.enemyBase: ${enemyBase.id}`);
        }
    }

    // for debug
    let _zonesStat = {};
    Object.keys(zones).forEach((key) => {
        let zone = zones[key];
        _zonesStat[zone.pods] = _zonesStat[zone.pods] || 0;
        _zonesStat[zone.pods]++;
    });
    printErr(`_zonesStat.amountPods: ${JSON.stringify(_zonesStat)}`);

    let moves = podsList.moveAll();

    let result = '';
    result = result.replace(/^\s+|\s+$/g,'');
    result = result || 'WAIT';
    printErr('PRINT: ' + result);
    print(result);
    print('WAIT');

}
