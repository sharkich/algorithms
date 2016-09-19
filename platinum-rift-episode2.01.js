/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

let INPUTS_GLOBAL = readline().split(' ');

const PLAYER_COUNT = parseInt(INPUTS_GLOBAL[0]); // the amount of players (always 2)
const MY_ID = parseInt(INPUTS_GLOBAL[1]); // my player ID (0 or 1)
const ZONE_COUNT = parseInt(INPUTS_GLOBAL[2]); // the amount of zones on the map
const LINK_COUNT = parseInt(INPUTS_GLOBAL[3]); // the amount of links between all zones

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

    isLinked(zone) {
        return this.links.findIndex((innerZone) => {
            return innerZone.id === zone.id;
            }) !== -1;
    }

    isHasMyPODs() {
        return this.pods[MY_ID] > 0;
    }

    run() {
        if (!this.isHasMyPODs()) {
            return '';
        }
        let pods = this.pods[MY_ID];
        let result = '';
        for(let i = 0; i < this.links.length; i++) {
            result += `1 ${this.id} ${this.links[i].id} `;
        }
        return result;
    }
}

const zones = {};

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

    let result = '';

    for (let i = 0; i < ZONE_COUNT; i++) {
        const INPUTS = readline().split(' ');
        const ZONE_ID = parseInt(INPUTS[0]); // this zone's ID
        const ZONE_OWNER_ID = parseInt(INPUTS[1]); // the player who owns this zone (-1 otherwise)
        const PODS_P0_IN_ZONE = parseInt(INPUTS[2]); // player 0's PODs on this zone
        const PODS_P1_IN_ZONE = parseInt(INPUTS[3]); // player 1's PODs on this zone
        const IS_VISIBLE_ZONE = parseInt(INPUTS[4]); // 1 if one of your units can see this tile, else 0
        const PLATINUM_AMOUNT = parseInt(INPUTS[5]); // the amount of Platinum this zone can provide (0 if hidden by fog)
        zones[ZONE_ID].update({
            owner: ZONE_OWNER_ID,
            pods: [PODS_P0_IN_ZONE, PODS_P1_IN_ZONE],
            isVisible: IS_VISIBLE_ZONE,
            platinum: PLATINUM_AMOUNT
        });

        result += zones[ZONE_ID].run();
    }

    result = result.replace(/^\s+|\s+$/g,'');

    // first line for movement commands, second line no longer used (see the protocol in the statement for details)
    print(result || 'WAIT');
    print('WAIT');

    // 1 245 259
    // 11 272 262
    // 1 285 272
    // 1 286 285
    // 2 319 320
    // 3 326 327
    // 1 327 320

}
