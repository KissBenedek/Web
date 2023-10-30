function legyenVeletlenSorrend(){
    let hetnapjai = ["hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat", "vasárnap"];
    let index = Math.floor(Math.random() * 7);
    let ujTomb = [hetnapjai[index]];
    hetnapjai.splice(index, 1);
    index = Math.floor(Math.random() * 6);
    ujTomb.push(hetnapjai[index]);
    hetnapjai.splice(index, 1);
    index = Math.floor(Math.random() * 5);
    ujTomb.push(hetnapjai[index]);
    hetnapjai.splice(index, 1);
    index = Math.floor(Math.random() * 4);
    ujTomb.push(hetnapjai[index]);
    hetnapjai.splice(index, 1);
    index = Math.floor(Math.random() * 3);
    ujTomb.push(hetnapjai[index]);
    hetnapjai.splice(index, 1);
    index = Math.floor(Math.random() * 2);
    ujTomb.push(hetnapjai[index]);
    hetnapjai.splice(index, 1);
    ujTomb.push(hetnapjai[0]);
    console.log("Az új tömb:", ujTomb);

    document.getElementById("ki").innerHTML = ujTomb;
    
}

