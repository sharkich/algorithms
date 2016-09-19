
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
    }

    addLink(zone) {
        this.links.push(zone);
    }

    get neighborhoods() {
        return this.links.length;
    }

    get isHasMyPODs() {
        return this.pods[MY_ID] > 0;
    }

    get isMyZone() {
        return this.id === MY_ID;
    }

    // sync(pods) {
    //     if (pods.length === this.pods)
    // }
}

class Pod {
    constructor(options) {
        this.zone = options.zone;
        this.experience = 0;
        this._isMoved = false;
        this.id = options.id || pods.length;
        this.alive = true;
    }

    move() {
        this._isMoved = true;
    }

    clear() {
        this._isMoved = false;
    }

    get isMoved() {
        return this._isMoved;
    }

    remove() {
        this.alive = false;
    }
}


function sync(zone, podsInZone) {
    if (zone.pods === podsInZone.length) {
        return;
    }
    if (zone.pods) {
        printErr(`opa ${zone.pods}/${podsInZone.length}`);
    }
    if (zone.pods > podsInZone.length) {
        for (let i = zone.pods - podsInZone.length; i--;) {
            let pod = new Pod({zone});
            pods.push(pod);
            printErr(`add pod #${pod.id} in zone #${zone.id}`);
        }
    } else if (zone.pods < podsInZone.length) {
        for (let i = podsInZone.length - zone.pods; i--;) {
            let pod = podsInZone[i-1];
            pod.remove();
            printErr(`die pod #${pod.id} in zone #${zone.id}`);
        }
    }
}


/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

let INPUTS_GLOBAL = readline().split(' ');

const PLAYER_COUNT = parseInt(INPUTS_GLOBAL[0]); // the amount of players (always 2)
const MY_ID = parseInt(INPUTS_GLOBAL[1]); // my player ID (0 or 1)
const ZONE_COUNT = parseInt(INPUTS_GLOBAL[2]); // the amount of zones on the map
const LINK_COUNT = parseInt(INPUTS_GLOBAL[3]); // the amount of links between all zones

let steps = 0;
const zones = {};
const pods = [];

// Init Zones
for (let i = 0; i < ZONE_COUNT; i++) {
    const INPUTS = readline().split(' ');
    const ZONE_ID = parseInt(INPUTS[0]); // this zone's ID (between 0 and ZONE_COUNT-1)
    const PLATINUM_SOURCE = parseInt(INPUTS[1]); // Because of the fog, will always be 0

    zones[ZONE_ID] = new Zone({
        id: ZONE_ID,
        platinum: PLATINUM_SOURCE
    });
}

// Init Links
for (let i = 0; i < LINK_COUNT; i++) {
    const INPUTS = readline().split(' ');
    const ZONE1 = parseInt(INPUTS[0]);
    const ZONE2 = parseInt(INPUTS[1]);

    zones[ZONE1].addLink(zones[ZONE2]);
    zones[ZONE2].addLink(zones[ZONE1]);
}

//printErr(`INIT #${MY_ID}/${PLAYER_COUNT}, ZoneCount: ${ZONE_COUNT}, LinkCount: ${LINK_COUNT}`);

// game loop
while (true) {
    const MY_PLATINUM = parseInt(readline()); // your available Platinum
    // printErr(`MY_PLATINUM:${MY_PLATINUM}`);

    let zonesPodsAmount = 0;

    for (let i = 0; i < ZONE_COUNT; i++) {
        const INPUTS = readline().split(' ');
        const ZONE_ID = parseInt(INPUTS[0]); // this zone's ID
        const ZONE_OWNER_ID = parseInt(INPUTS[1]); // the player who owns this zone (-1 otherwise)
        const PODS_P0_IN_ZONE = parseInt(INPUTS[2]); // player 0's PODs on this zone
        const PODS_P1_IN_ZONE = parseInt(INPUTS[3]); // player 1's PODs on this zone
        const IS_VISIBLE_ZONE = parseInt(INPUTS[4]); // 1 if one of your units can see this tile, else 0
        const PLATINUM_AMOUNT = parseInt(INPUTS[5]); // the amount of Platinum this zone can provide (0 if hidden by fog)
        let zone = zones[ZONE_ID];
        zone.update({
            owner: ZONE_OWNER_ID,
            pods: [PODS_P0_IN_ZONE, PODS_P1_IN_ZONE],
            isVisible: IS_VISIBLE_ZONE,
            platinum: PLATINUM_AMOUNT
        });

        sync(zone, pods.filter((pod) => {
            return pod.zone.id === zone.id && pod.alive;
        }));
    }

    let result = '';

    result = result.replace(/^\s+|\s+$/g,'');
    // printErr('print: ' + result);
    print(result || 'WAIT');
    print('WAIT');
    steps++;

    // clear all PODs after moves(!)
    pods.forEach((pod) => {
        pod.clear();
    });
}
