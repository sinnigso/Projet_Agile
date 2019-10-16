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
        this.id=0;
        this.nbTouche=0;
        this.sens="H";
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
    bateaux[n].id=n+1;
    caseDispo=true
    for(i=0;i<taille;i++){ //Vérifie s'il y a deja un bateau
		if(sens=="H"){
			if(plateau[pos.caseY][pos.caseX+i]!=0){
				caseDispo=false;
			}
		}
		else {
			if(plateau[pos.caseY+i][pos.caseX]!=0){
				caseDispo=false;
			}
		}
		
    }
    if (caseDispo==true){
        bateaux[n].pos=pos
        
        for(i=0;i<taille;i++){
			if(sens=="H"){
                    plateau[pos.caseY][pos.caseX+i]=bateaux[n].id;//Place le bateau dans le tableau 2D
                    drawCase(pos.caseX+i,pos.caseY,"blue",couleur);//Dessine le bateau
				}
			else{
					plateau[pos.caseY+i][pos.caseX]=bateaux[n].id;//Place le bateau dans le tableau 2D
                    drawCase(pos.caseX,pos.caseY+i,"blue",couleur);//Dessine le bateau
                }
        }
        bateaux[n].sens=sens;
        return caseDispo;    
    }
}
//Converti les click en case du tableau
function clickToCase(x,y){
    return({caseX:Math.floor(x/tailleCaseX),caseY:Math.floor(y/tailleCaseY)});
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
		console.log(plateau)
	}
    else if (state == "JOUER")
	{
		pos={caseX,caseY}=(clickToCase(event.pageX-canvas.offsetLeft,event.pageY-canvas.offsetTop));//On récupère les coordonnes du clic
		if(plateau[pos.caseY][pos.caseX]!=0){
            if(plateau[pos.caseY][pos.caseX]!=-1){//Si le bateau n'a pas déja été touché
                console.log("Touché!");
                drawCase(pos.caseX,pos.caseY,"blue","red"); // On colorie en rouge le bateau touché


                idBateau=plateau[pos.caseY][pos.caseX];// On récupère l'id du bateau touché
                bateau_touche=bateaux[idBateau-1]; //On récupère le bateau correspondant dans le tableau de bateaux

                plateau[pos.caseY][pos.caseX]=-1;//On indique que le bateau est touché dans le tableau
                //BateauTouche(joueurTouche, caseTouchee);
                
                bateau_touche.nbTouche+=1;
                console.log(bateau_touche)

                if(bateau_touche.nbTouche>=bateau_touche.taille){//Si le bateau est coulé
                    for(i=0;i<bateau_touche.taille;i++){//On recolorie les cases en noir
                        if(bateau_touche.sens=='H'){
                            drawCase(bateau_touche.pos.caseX+i,bateau_touche.pos.caseY,"blue","blue");
                        }else{
                            drawCase(bateau_touche.pos.caseX,bateau_touche.pos.caseY+i,"blue","blue");
                        }
                    }
                        
                }
            }
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
	document.getElementById("sens").innerHTML = "SENS : "+sens;
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


//Fin de la partie 
function fin_partie() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

//rafaichir la page
var refresh = window.getElementById('refresh');
refresh.addEventListener('click', location.reload(), false);
