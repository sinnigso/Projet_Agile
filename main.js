//Initialisation des variables globales
var plateau= [];
var nbCase=10;
var nBateau = 0;
var state = "PLACEMENT" //Etat du jeu ; 
var sens = 'H'; //Sens des bateaux
var buttonBateau = document.getElementById("bateau");
var canvas = document.getElementById("canvas");
var preview = document.getElementById("preview");
var tailleCaseX=canvas.width/nbCase;
var tailleCaseY=canvas.height/nbCase;

drawPlateau();//Affichage du plateau
initPlateau();//Initialisation du tableau 2D
initPreview();

let Bateau = class { //Objet bateau
    constructor(taille,couleur) {
        this.taille=taille;
        this.couleur=couleur;
    }
};

// On met dans le tableau les différents bateaux
var bateaux=[]
bateaux.push(new Bateau(5,'pink'));
bateaux.push(new Bateau(4,'yellow'));
bateaux.push(new Bateau(3,'orange'));
bateaux.push(new Bateau(3,'purple'));
bateaux.push(new Bateau(2,'aquamarine'));
buttonBateau.innerHTML = "BATEAU : " + bateaux[nBateau].couleur; // Pour le bouton

function initPreview(){
    var context = preview.getContext("2d");
    context.beginPath();
    context.strokeStyle="black";
    context.lineWidth="2";
    context.strokeRect(0,0,preview.width,preview.height);
}



//Affiche une case
function drawCase(i,j,strokeColor,fillColor){
  var context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle=strokeColor;
  context.fillStyle=fillColor;
  context.lineWidth="2";
  context.fillRect((canvas.width/nbCase)*i,(canvas.height/nbCase)*j,canvas.width/nbCase,canvas.height/nbCase);//Rempli la case
  context.strokeRect((canvas.width/nbCase)*i,(canvas.height/nbCase)*j,canvas.width/nbCase,canvas.height/nbCase);//Change le contour
}
//Dessine le plateau de jeu
function drawPlateau(){
    for (j = 0; j < nbCase; j++) {
        for (i = 0; i < nbCase; i++) {
            drawCase(i,j,"blue","white");
        }
    }
}

//Initialise le tableau 2D correspondant au plateau

function initPlateau(){
    for (var i = 0; i < 10; ++i) {
        plateau.push([0,0,0,0,0,0,0,0,0,0]);
      }
}

//Placer les bateaux
//Pour l'instant ne marche qu'à l'horizontal
function placerBateau(pos,n){
    couleur=bateaux[n].couleur;
    taille=bateaux[n].taille;
    caseDispo=true
    for(i=0;i<taille;i++){ //Vérifie s'il y a deja un bateau
		if(sens=="H")
			if(plateau[pos.caseY][pos.caseX+i]==1){
				caseDispo=false;
			}
		else {
			if(plateau[pos.caseY+i][pos.caseX]==1){
				caseDispo=false;
			}
		}
		
    }
    for(i=0;i<taille;i++){
		if (caseDispo==true){
			if(sens=="H"){
					plateau[pos.caseY][pos.caseX+i]=1;//Place le bateau dans le tableau 2D
					drawCase(pos.caseX+i,pos.caseY,"blue",couleur);//Dessine le bateau
				}
			else{
					plateau[pos.caseY+i][pos.caseX]=1;//Place le bateau dans le tableau 2D
					drawCase(pos.caseX,pos.caseY+i,"blue",couleur);//Dessine le bateau
				}
		}
    }
        return caseDispo;    
}

//Converti les click en case du tableau
function clickToCase(x,y){
    return({caseX:Math.floor(x/tailleCaseX),caseY:Math.floor(y/tailleCaseY)});
    /*for(i=0;i<5;i++){
        drawCase(caseX+i,caseY,"blue",'rgba(255, 165, 0, 250)');
    }*/
    //Affiche le contenu de la case correspondante
    //On pourra ensuite traiter le contenu s'il y a un bateau 
}

function tirer(){
	
}
/**
 *
 * Partie Solène bateau touché
 *
 **/

//Detection des évenements
canvas.onmousedown  = function(event) {
	if(state == "PLACEMENT") 
	{
		if(typeof nBateau=='undefined'){
			nBateau=0;
		}
		event = event || window.event;
		event.preventDefault();
		pos={caseX,caseY}=(clickToCase(event.pageX-canvas.offsetLeft,event.pageY-canvas.offsetTop));//On récupère les coordonnes du clic
		//on place 5 bateaux
		if(nBateau<bateaux.length){
			if(placerBateau(pos,nBateau)){
				//bateaux.splice(nBateau);
				//nBateau = 0;
				nBateau+=1;
			}			
		}
		console.log(plateau[pos.caseY][pos.caseX])
	}
    else if (state == "JOUER")
	{
		pos={caseX,caseY}=(clickToCase(event.pageX-canvas.offsetLeft,event.pageY-canvas.offsetTop));//On récupère les coordonnes du clic
		if(plateau[pos.caseY][pos.caseX]==1)
		{
			BateauTouche(joueurTouche, caseTouchee);
			drawCase(pos.caseX,pos.caseY,"blue","red");
			console.log("Touché!");
		}
		else drawCase(pos.caseX,pos.caseY,"blue","aquamarine");
	}
	console.log(pos.caseY+" "+pos.caseX);

}

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
//cout plateau
function coutPlateau(){
	var str="";
    for (j = 0; j < nbCase; j++) {
        for (i = 0; i < nbCase; i++) {
            str= str + plateau[j][i];
        }
        console.log(str);
		str = "";
    }
}

document.getElementById("sens").onmousedown  = function(event) {
    event = event || window.event;
    event.preventDefault();
	if (sens == 'H')
		sens = 'V';    
	else sens = 'H';
	coutPlateau();
}


document.getElementById("valider").onmousedown  = function(event) {
    event = event || window.event;
    event.preventDefault();
	state="JOUER";
	document.getElementById("sens").setAttribute("disabled", true);
	document.getElementById("valider").setAttribute("disabled", true);
	buttonBateau.setAttribute("disabled", true);
	drawPlateau();
	coutPlateau();
}

buttonBateau.onmousedown  = function(event) {
    event = event || window.event;
    event.preventDefault();
	if(bateaux.length !=0) {
		if (nBateau < bateaux.length ) nBateau++;
		else nBateau = 0;
		buttonBateau.innerHTML = "BATEAU : " + bateaux[nBateau].couleur;
	}
	else buttonBateau.innerHTML = "BATEAU : ---" ;
}

/*Les différents bateaux :
- porte avion 5 cases
- croiseur 4 cases
- contre torpilleur (3 cases)
- sous marin 3 cases
- torpilleur 2 cases
*/

