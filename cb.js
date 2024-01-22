const osszeadas = (a, b, callback) => {
    callback(a + b);
};

const kivonas = (a, b, callback) => {
    callback(a - b);
};

const szorzas = (a, b, callback) => {
    callback(a * b);
};

const osztas = (a, b, callback) => {
    if (b !== 0) {
        callback(a / b);
    } else {
        callback("Hiba: nullával való osztás!");
    }
};

const szamol = (muvelet, szam1, szam2, callback) => {
    switch (muvelet) {
        case "osszeadas":
            osszeadas(szam1, szam2, callback);
            break;
        case "kivonas":
            kivonas(szam1, szam2, callback);
            break;
        case "szorzas":
            szorzas(szam1, szam2, callback);
            break;
        case "osztas":
            osztas(szam1, szam2, callback);
            break;
        default:
            callback("Hiba: Ismeretlen művelet!");
    }
};

const muvelet = "osztas";
const szam1 = 5;
const szam2 = 3;

szamol(muvelet, szam1, szam2, (eredmeny) => {
    console.log({szam1} + {szam2},{eredmeny});
});

