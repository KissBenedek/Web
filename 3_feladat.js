// 1. feladat: Get number from string - Szám kinyerése stringből
function getNumberFromString(s) {
    for(let i = 0; i< s.length;i++)
    {
        if(s[i] !== isNaN){
            return i
        }
    }
}

console.log("----- 1. feladat -----");
console.log(getNumberFromString("1"), 1);
console.log(getNumberFromString("123"), 123);
console.log(getNumberFromString("this is number: 7"), 7);


// 2. feladat: Find the Mine! - Találd meg az aknát!
function mineLocation(field){
    field = [,];
    for(let i = 0; i <= 1; i++){
        for(let j = 0; j <= 1; j++){
            
        }
    }
    
    return [0, 0];
}

console.log("----- 2. feladat -----");
console.log(mineLocation([ [1, 0], [0, 0] ]), [0, 0]);
console.log(mineLocation([ [1, 0, 0], [0, 0, 0], [0, 0, 0] ]), [0, 0]);
console.log(mineLocation([ [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0] ]), [2, 2]);


// 3. feladat: Simple consecutive pairs - Egyszerű egymást követő párok
function pairs(arr) {
    let count = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        if (Math.abs(arr[i] - arr[i + 1]) === 1) {
            count++;
            i++; 
        }
    }
    return count;
}

console.log("----- 3. feladat -----");
console.log(pairs([1,2,5,8,-4,-3,7,6,5]),3);
console.log(pairs([21, 20, 22, 40, 39, -56, 30, -55, 95, 94]),2);
console.log(pairs([81, 44, 80, 26, 12, 27, -34, 37, -35]),0);
console.log(pairs([-55, -56, -7, -6, 56, 55, 63, 62]),4);
console.log(pairs([73, 72, 8, 9, 73, 72]),3);