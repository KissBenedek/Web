function callback() {
    function osszead(szam1, szam2) {
        return szam1 + szam2;
    }

    function kivon(szam1, szam2) {
        return szam1 - szam2;
    }

    function szoroz(szam1, szam2) {
        return szam1 * szam2;
    }

    function oszt(szam1, szam2) {
        return szam1 / szam2;
    }

    function szamol(muvelet, szam1, szam2) {
        switch (muvelet) {
            case "osszead":
                return osszead(szam1, szam2);
            case "kivon":
                return kivon(szam1, szam2);
            case "szoroz":
                return szoroz(szam1, szam2);
            case "oszt":
                return oszt(szam1, szam2);
            default:
                console.error("Hiba: Ismeretlen művelet!");
                return undefined;
        }
    }

    let eredmeny = szamol("osszead", 5, 3);
    console.log('Az összeadás eredménye: 8, a számolt érték: ' + eredmeny);

    eredmeny = szamol("kivon", 8, 2);
    console.log('A kivonás eredménye: 6, a számolt érték: ' + eredmeny);

    eredmeny =  szamol("szoroz", 4, 6);
    console.log('A szorzás eredménye: 24, a számolt érték: ' + eredmeny);

    eredmeny =  szamol("oszt", 9, 3);
    console.log('Az osztás eredménye: 3, a számolt érték: ' + eredmeny);
}

callback();
