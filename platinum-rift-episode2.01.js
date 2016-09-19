/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

let INPUTS_GLOBAL = readline().split(' ');

const PLAYER_COUNT = parseInt(INPUTS_GLOBAL[0]); // the amount of players (always 2)
const MY_ID = parseInt(INPUTS_GLOBAL[1]); // my player ID (0 or 1)
const ZONE_COUNT = parseInt(INPUTS_GLOBAL[2]); // the amount of zones on the map
const LINK_COUNT = parseInt(INPUTS_GLOBAL[3]); // the amount of links between all zones

for (let i = 0; i < ZONE_COUNT; i++) {
    const INPUTS = readline().split(' ');

    let zoneId = parseInt(INPUTS[0]); // this zone's ID (between 0 and ZONE_COUNT-1)
    let platinumSource = parseInt(INPUTS[1]); // Because of the fog, will always be 0
}
for (let i = 0; i < LINK_COUNT; i++) {
    const INPUTS = readline().split(' ');

    const zone1 = parseInt(INPUTS[0]);
    const zone2 = parseInt(INPUTS[1]);
}

printErr(`INIT #${MY_ID}/${PLAYER_COUNT}, ZoneCount: ${ZONE_COUNT}, LinkCount: ${LINK_COUNT}`);

// game loop
while (true) {
    const MY_PLATINUM = parseInt(readline()); // your available Platinum

    for (let i = 0; i < ZONE_COUNT; i++) {
        const INPUTS = readline().split(' ');

        const ZONE_ID = parseInt(INPUTS[0]); // this zone's ID
        const ZONE_OWNER_ID = parseInt(INPUTS[1]); // the player who owns this zone (-1 otherwise)
        const PODS_P0_IN_ZONE = parseInt(INPUTS[2]); // player 0's PODs on this zone
        const PODS_P1_IN_ZONE = parseInt(INPUTS[3]); // player 1's PODs on this zone
        const IS_VISIBLE_ZONE = parseInt(INPUTS[4]); // 1 if one of your units can see this tile, else 0
        const PLATINUM_AMOUNT = parseInt(INPUTS[5]); // the amount of Platinum this zone can provide (0 if hidden by fog)
    }

    // Write an action using print()
    // To debug: printErr('Debug messages...');


    // first line for movement commands, second line no longer used (see the protocol in the statement for details)
    print('WAIT');
    print('WAIT');
}