function swapHeadTail(arr) {
    const length = arr.length;

    if (length % 2 === 0) {
        const kozep = length / 2;
        const eleje = arr.slice(0, kozep);
        const hatulja = arr.slice(kozep);
        return hatulja.concat(eleje);
    } else {
        const kozep = Math.floor(length / 2);
        const eleje = arr.slice(0, kozep);
        const hatulja = arr.slice(kozep + 1);
        return hatulja.concat(arr[kozep], eleje);
    }
}

