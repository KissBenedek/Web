function meanVsMedian(arr) {
    const mean = arr.reduce((sum,num) => sum + num, 0) / arr.length;

    const sortArr = arr.slice().sort((a, b) => a - b);
    const median = sortArr[Math.floor(sortArr.length/2)]

    if(mean > median)
    {
        return 'mean';
    }
    else if(mean < median)
    {
        return 'median';
    }
    else
    {
        return 'same';
    }
}

console.log(meanVsMedian([1, 1, 1]), ' >> same');
console.log(meanVsMedian([1, 2, 37]), ' >> mean');
console.log(meanVsMedian([7, 14, -70]), ' >> median');