function yes(){
    let x = document.getElementById("varos").value
    fetch(`https://hur.webmania.cc/zips/${x}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(obj => {
      console.log(obj.zips);
      let citys = obj.zips
      document.getElementById("kiiras").innerHTML = megjelen(citys);
      
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });

    
}

function megjelen(arr){
  if(arr.length == 0){
    return "Nincs találat"
  }
  let result = "<ol>";
    for(let c of arr){
      if(!result.includes(c.name)){
        result+= `<li>${c.zip},
        ${c.name}</li>`
      }
       
    }


    return result + "</ol>"
    
}

