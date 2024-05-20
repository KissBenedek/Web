function findDeletedNumber(arr, mixArr) {
      // Calculate the sum of the series from 1 to N
    const N = arr.length;
    const totalSum = (N * (N + 1)) / 2;

    // Calculate the sum of the mixed array
    const mixedSum = mixArr.reduce((acc, num) => acc + num, 0);

    // The missing number is the difference between the two sums
    const missingNumber = totalSum - mixedSum;

    // If no number is missing, return 0
    return missingNumber === 0 ? 0 : missingNumber;
}
