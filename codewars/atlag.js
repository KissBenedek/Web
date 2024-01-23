function getAverage(marks){
   return Math.floor((marks.reduce((total, num) => total + num))/marks.length); 
}
