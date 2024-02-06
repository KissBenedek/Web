function swapHeadAndTail(arr) {
    const length = arr.length;
    
    if (length % 2 === 0) {
        const kozep = length / 2;
        const eleje = arr.slice(0, kozep);
        const hatulja = arr.slice(kozep);
        return hatulja.concat(eleje);
    } 
    else 
    {
        const kozep = Math.floor(length / 2);
        const eleje = arr.slice(0, kozep);
        const hatulja = arr.slice(kozep + 1);
        return hatulja.concat(arr[kozep], eleje);
    }
}

console.log(swapHeadAndTail([ 1, 2, 3, 4, 5 ]), [ 4, 5, 3, 1, 2 ]);
console.log(swapHeadAndTail([ -1, 2 ]), [ 2, -1 ]);
console.log(swapHeadAndTail([ 1, 2, -3, 4, 5, 6, -7, 8 ]), [ 5, 6, -7, 8, 1, 2, -3, 4 ]);