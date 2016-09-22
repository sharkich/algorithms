/* globals readline, printErr, print */

// printErr(`~~~~~~~~~~~~~~~~~~ START ~~~~~~~~~~~~~~~~~~`);

import {Game} from './game';
import {Zone} from './zone';

const INPUTS_GLOBAL = readline().split(' ');

const MY_ID = parseInt(INPUTS_GLOBAL[1]));
const game = new Game(
    MY_ID,
    +!MY_ID,
    parseInt(INPUTS_GLOBAL[2]),
    parseInt(INPUTS_GLOBAL[3])
);
// printErr(`GAME_CONF: ${JSON.stringify(game)}`);

for (let i = 0; i < game.zonesAmount; i++) {
    const INPUT_ZONE = readline().split(' ');
    game.addZone(new Zone(parseInt(INPUT_ZONE[0]), parseInt(INPUT_ZONE[1])));
}
for (let i = 0; i < game.linksAmount; i++) {
    const INPUT_LINKS = readline().split(' ');//
    game.addZoneLink(parseInt(INPUT_LINKS[0]), parseInt(INPUT_LINKS[1]));
}

let step = 0;
while (true) {
    step++;
    // printErr(`~~~~~~~~~~~~~~~~~~ STEP #${step} ~~~~~~~~~~~~~~~~~~`);

    const MY_PLATINUM = parseInt(readline());
    // printErr(`MY_PLATINUM: ${MY_PLATINUM}`);

    for (let i = 0; i < game.zonesAmount; i++) {
        const INPUTS = readline().split(' ');
        const ZONE_ID = parseInt(INPUTS[0]);
        game.updateZone(
            ZONE_ID,
            parseInt(INPUTS[1]),
            parseInt(INPUTS[2]),
            parseInt(INPUTS[3]),
            parseInt(INPUTS[4]) === 1,
            parseInt(INPUTS[5])
        );
        // if (game.zones[ZONE_ID].isChangedOwner) {
        //     printErr(`new owner at zone#${ZONE_ID} -> ${game.zones[ZONE_ID].owner}`);
        // }
        // if (game.zones[ZONE_ID].isChangedPods) {
        //     printErr(`> changed pods at zone#${ZONE_ID} -> ${JSON.stringify(game.zones[ZONE_ID].pods)}`);
        // }
    }

    let result = game.go();
    // printErr(`result ${result}`);
    print(result || 'WAIT');
    print('WAIT');
}
