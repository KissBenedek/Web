function findSmallest(arr, returnType) {
    if (returnType === 'value') {
        return Math.min(...arr);
    } else if (returnType === 'index') {
        return arr.indexOf(Math.min(...arr));
    } else {
        return undefined;
    }
}

const numbers = [5, 2, 8, 1, 4];
console.log(findSmallest(numbers, 'value'));
console.log(findSmallest(numbers, 'index'));