function diff(a, b){
 const Afilter = a.filter(char => !b.includes(char));
  const Bfilter = b.filter(char => !a.includes(char));
  
  // Combine the unique elements and remove duplicates using a Set
  const differenceSet = new Set([...Afilter, ...Bfilter]);
  
  // Convert the set to an array and sort it
  return Array.from(differenceSet).sort();
}
