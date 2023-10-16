let t = [];

function getInputValue()
{
    let v = document.getElementById("text").value;
    t = v.split(" ");
    let tartalom = ``;

    for(let i = 0; i < t.length; i++){
        tartalom += `<div class = "item">${t[i]}</div>`
    }

    for(let i=0; i < t.length; i++){
        document.getElementById("elements").innerHTML = tartalom;
    }

    var d = document.getElementById("cont");

    d.style.display = "none";
}

    
