/**
 *
 * Partie Solène bateau touché
 *
 **/

function BateauTouche(joueurTouche, caseTouchee) {
    var test=0;
    if (VerificationCaseTouchee(caseTouchee)) {
        alert("Touchée!");
    }
    else{
        for (var i=0; i<joueurTouche.bateau.length; i++) {
            var bateauTouche = joueurTouche.bateau[i];
            for (var a=0; a<bateauTouche.casesPrises.length; a++) {
                var coord = bateauTouche.casesPrises[a];
                if (caseTouchee == coord){
                    caseVisee.push(caseTouchee);
                    bateauTouche.casesDetruites.push(caseTouchee);
                    if(BateauCoule(bateauTouche.casesPrises, bateauTouche.casesDetruites) == true){
                        bateauTouche.etat ="Coulé";
                        alert(bateauTouche.typeB+"Coulé!");
                        test=1;
                    }
                    else {
                        alert(bateauTouche.typeB+"Touché!");
                        test=1;
                    }
                }
            }
        }
        if (test == 0){
            caseVisee.push(caseTouchee);
            alert("*plouf*");
        }
    }
}

function BateauCoule(tabCaseTouchee, tabCaseDetruite) {
    if (tabCaseTouchee.length == tabCaseDetruite.length) {
        tabCaseTouchee.sort();
        tabCaseDetruite.sort();
        for (var i=0; i<tabCaseTouchee.length; i++) {
            if(tabCaseTouchee[i] != tabCaseDetruite[i]) {
                return false;
            }

        }
        return true;
    }
    return false;
}
