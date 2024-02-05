function meanVsMedian(arr) {
    const mean = arr.reduce((sum, num) => sum + num, 0) / arr.length;

    const sortedArr = arr.slice().sort((a, b) => a - b);
    const median = sortedArr[Math.floor(sortedArr.length / 2)];

    if (mean > median) {
        return 'mean';
    } else if (median > mean) {
        return 'median';
    } else {
        return 'same';
    }
}
