function goodVsEvil(good, evil){
    const GOOD_POWER = [1, 2, 3, 3, 4, 10];
    const EVIL_POWER = [1, 2, 2, 2, 3, 5, 10];

    let goodWins = good.split(' ').reduce((sum, el, index) => {
        return sum + el * GOOD_POWER[index]
    }, 0);

    let evilWins = evil.split(' ').reduce((sum, el, index) => {
        return sum + el * EVIL_POWER[index]
    }, 0);

    if (evilWins < goodWins) {
        return 'Battle Result: Good triumphs over Evil';
    } else if (evilWins > goodWins) {
        return 'Battle Result: Evil eradicates all trace of Good';
    }
    return 'Battle Result: No victor on this battle field';
}

console.log(goodVsEvil('3 1 1 1 1 1', '1 1 1 1 1 1 1'));