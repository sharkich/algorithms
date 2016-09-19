function tribonacci(signature,n){
    if (n <= 3) {
        return signature.splice(0, n);
    }

    function* triteration(signature) {
        let triList = [].concat(signature);
        for(;;) {
            const L = signature.length - 1;
            let next = signature[L-2] + signature[L-1] + signature[L];
            triList.push(next);
            yield next;
        }
    }

    let trigerator = triteration(signature);

    for(let i = n - 3; i--;) {
        signature.push(trigerator.next().value)
    }

    return signature;
}

console.log(tribonacci([1,1,1],10));