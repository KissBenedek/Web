function sumOfCubedOddNumbers(arr) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'number' || isNaN(arr[i]) || arr[i] % 2 === 0) {
            continue;
        }

        sum += Math.pow(arr[i], 3); 
    }

    return sum;
}

const numbers = [1, 2, 3, 'four', 5, true, 6];
console.log(sumOfCubedOddNumbers(numbers)); 