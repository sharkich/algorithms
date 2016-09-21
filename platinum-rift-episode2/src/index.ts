/* globals readline, printErr, print */

import {Zone} from './zone';

let z = new Zone();
// console.log(1);

const INPUTS_GLOBAL = readline();
printErr(`INPUTS_GLOBAL: ${INPUTS_GLOBAL}`);
for (let i = 0; i < 94; i++) {
    const ZONES = readline();
    printErr(`ZONES: ${ZONES}`);
}
for (let i = 0; i < 143; i++) {
    const LINKS = readline();
    printErr(`LINKS: ${LINKS}`);
}
while (true) {
    const MY_PLATINUM = parseInt(readline());
    printErr(`MY_PLATINUM: ${MY_PLATINUM}`);

    for (let i = 0; i < 94; i++) {
        const INPUTS = readline();
        printErr(`INPUTS: ${INPUTS}`);
    }
    print('WAIT');
    print('WAIT');
}
