let fizetes = {
    Anna : 2100,
    Cecil : 1890,
    Emil : 2050,
    Gerald : 2920
}


function osszegzes()
{
    let osszeg = 0;
    for (let szemely in fizetes) {
        if (fizetes.hasOwnProperty(szemely)) {
            osszeg += fizetes[szemely];
            console.log(`${szemely} fizetése: ${fizetes[szemely]}`);
        }
    }

    console.log(`\nAz össz kereset: ${osszeg}`);

    let kiiratas = document.createElement('div');
    kiiratas.innerHTML = '<h2>Fizetések</h2>';

    for (let szemely in fizetes) {
        if (fizetes.hasOwnProperty(szemely)) {
            kiiratas.innerHTML += `<p>${szemely}: ${fizetes[szemely]}</p>`;
        }
    }

    kiiratas.innerHTML += `<p><strong>Az össz kereset: ${osszeg}</strong></p>`;

    document.body.appendChild(kiiratas);
}
        