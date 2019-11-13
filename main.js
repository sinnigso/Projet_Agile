//Initialisation des variables globales
//var plateau= [];
var tab_sens=["H","V"];
var nbCase=10;
var state = "PLACEMENT" //Etat du jeu ; 
var sens = 'H'; //Sens des bateaux
var buttonBateau = document.getElementById("bateau");
var tailleCaseX = document.getElementById("canvas_joueur_1").width/nbCase;
var tailleCaseY = document.getElementById("canvas_joueur_2").height/nbCase;
var canvas_joueur_2=document.getElementById("canvas_joueur_2");
var canvas_joueur_1=document.getElementById("canvas_joueur_1");
var tour="JOUEUR_2";
var autreJoueurValide=false;

var audio_goutte = new Audio('goutte.mp3');
var audio_explosion = new Audio('explosion.mp3');
//var tailleCaseX=canvas.width/nbCase;
//var tailleCaseY=canvas.height/nbCase;

let Bateau = class { //Objet bateau
    constructor(taille,couleur,id) {
        this.taille=taille;
        this.couleur=couleur;
        this.id=id;
        this.nbTouche=0;
        this.sens="H";
        this.pos;
    }
};
let Joueur = class { 
    constructor(pseudo) {
        this.pseudo=pseudo;
        this.nBateau=0;
        this.nbplace=0;
        this.nbtirtotal=0;
        this.nbtirloupe=0;
        this.bateaux=[];
        this.nbcoulee=0;
    }
};

var joueur1=new Joueur("Joueur 1");
var joueur2=new Joueur("Joueur 2");


//buttonBateau.innerHTML = "BATEAU : " + bateaux_init[nBateau].couleur; // Pour le bouton
//drawPlateau();//Affichage du plateau
//initPlateau();//Initialisation du tableau 2D
//initPreview();

var typeParti="MULTI";
if(typeParti=="ROBOT"){
    initPartiRobot();
}
else{
    initPartiDeuxJoueurs();
}


function initPartiRobot(){
    var plateauJoueur=initPlateau()
    var plateauRobot=initPlateau()
    var canvas_joueur=document.getElementById("canvas_joueur_1");
    var canvas_robot=document.getElementById("canvas_joueur_2");
    drawPlateau(canvas_joueur);
    drawPlateau(canvas_robot);
    placerBateauIA(plateauRobot);
    evenement(canvas_joueur,plateauJoueur);
}
function initPartiDeuxJoueurs(){
    joueur1=new Joueur("Joueur 1");
    joueur2=new Joueur("Joueur 2");
    
    joueur1.bateaux=createBateauTab();
    joueur2.bateaux=createBateauTab();

    var plateauJoueur_1=initPlateau()
    var plateauJoueur_2=initPlateau()
    
    var canvas_joueur_1=document.getElementById("canvas_joueur_1");
    var canvas_joueur_2=document.getElementById("canvas_joueur_2");

    //canvas_joueur_2.style.cursor="not-allowed";
    drawPlateau(canvas_joueur_1);
    drawPlateau(canvas_joueur_2);

    evenement(canvas_joueur_1,plateauJoueur_1,joueur1);
    evenement(canvas_joueur_2,plateauJoueur_2,joueur2);
}
function createBateauTab(){
    var bateaux_init=[];
    bateaux_init.push(new Bateau(5,'pink',1));
    bateaux_init.push(new Bateau(4,'yellow',2));
    bateaux_init.push(new Bateau(3,'orange',3));
    bateaux_init.push(new Bateau(3,'purple',4));
    bateaux_init.push(new Bateau(2,'aquamarine',5));
    return bateaux_init;
}

// On met dans le tableau les différents bateaux

function placerBateauIA(plateau){
    for(var i=0;i<5;i++){
        do{
            rand_sens=tab_sens[getRandomIntInclusive(0,1)]
            if(rand_sens=="H"){
                rand_x=getRandomIntInclusive(0,nbCase-bateaux[i].taille)
                rand_y=getRandomIntInclusive(0,9)
            }else{
                rand_y=getRandomIntInclusive(0,nbCase-bateaux[i].taille)
                rand_x=getRandomIntInclusive(0,9)
            }
            bateaux[i].sens=rand_sens;
            pos={caseX:rand_x,caseY:rand_y}
            console.log(nbCase-bateaux[i].taille)
        }while(verifCaseDispo(plateau,pos,bateaux[i])==false);
        console.log(i)
        placerBateauTableau(plateau,pos,bateaux[i])
        console.log(plateau)
    }
    
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }

function placerBateauTableau(plateau,pos,bateau){
    for(var i=0;i<bateau.taille;i++){ //Vérifie s'il y a deja un bateau
        if(bateau.sens=="H"){
            plateau[pos.caseY][pos.caseX+i]=bateau.id;//Place le bateau dans le tableau 2D
        }
        else{
            plateau[pos.caseY+i][pos.caseX]=bateau.id;//Place le bateau dans le tableau 2D
        }
    }
}
function verifCaseDispo(plateau,pos,bateau){
    
    caseDispo=true;
    for(var i=0;i<bateau.taille;i++){ //Vérifie s'il y a deja un bateau
		if(bateau.sens=="H"){
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
    console.log(caseDispo)
    return caseDispo;
}

//Affiche une case
function drawCase(canvas,i,j,strokeColor,fillColor){
  var context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle=strokeColor;
  context.fillStyle=fillColor;
  context.lineWidth="2";
  context.fillRect((canvas.width/nbCase)*i,(canvas.height/nbCase)*j,canvas.width/nbCase,canvas.height/nbCase);//Rempli la case
  context.strokeRect((canvas.width/nbCase)*i,(canvas.height/nbCase)*j,canvas.width/nbCase,canvas.height/nbCase);//Change le contour
}
function drawContour(canvas,strokeColor){
    var context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle=strokeColor;
    context.lineWidth="9";
    context.strokeRect(0,0,canvas.width,canvas.height)
}




//Dessine le plateau de jeu
function drawPlateau(canvas){
    for (j = 0; j < nbCase; j++) {
        for (i = 0; i < nbCase; i++) {
            drawCase(canvas,i,j,"blue","white");
        }
    }
    drawContour(canvas,"blue");

}

//Initialise le tableau 2D correspondant au plateau

function initPlateau(){
    var plateau=[]
    for (var i = 0; i < 10; ++i) {
        plateau.push([0,0,0,0,0,0,0,0,0,0]);
      }
      return plateau;
}

//Placer les bateaux
//Pour l'instant ne marche qu'à l'horizontal
function placerBateauJoueur(canvas,pos,n,plateau,joueur){
    couleur=joueur.bateaux[n].couleur;
    taille=joueur.bateaux[n].taille;
    caseDispo=true;
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
        joueur.bateaux[n].pos=pos
        for(i=0;i<taille;i++){
			if(sens=="H"){
                    plateau[pos.caseY][pos.caseX+i]=joueur.bateaux[n].id;//Place le bateau dans le tableau 2D
                    drawCase(canvas,pos.caseX+i,pos.caseY,"blue",couleur);//Dessine le bateau
				}
			else{
					plateau[pos.caseY+i][pos.caseX]=joueur.bateaux[n].id;//Place le bateau dans le tableau 2D
                    drawCase(canvas,pos.caseX,pos.caseY+i,"blue",couleur);//Dessine le bateau
                }
        }
        joueur.bateaux[n].sens=sens;
        console.log("Bateau placé")
    }
    
    return caseDispo;
}
//Converti les click en case du tableau

function clickToCase(x,y){
    return({caseX:Math.floor(x/tailleCaseX),caseY:Math.floor(y/tailleCaseY)}); 
}

//Detection des évenements
function evenement(canvas,plateau,joueur){
    
    canvas.onmousedown  = function(event) {
        if(state == "PLACEMENT")
        {
            
            event = event || window.event;
            event.preventDefault();
            pos={caseX,caseY}=(clickToCase(event.pageX-canvas.offsetLeft,event.pageY-canvas.offsetTop));//On récupère les coordonnes du clic
            //on place 5 bateaux
            if(joueur.nBateau<joueur.bateaux.length){
                
                if(placerBateauJoueur(canvas,pos,joueur.nBateau,plateau,joueur)){
                    joueur.nBateau++;
                    joueur.nbplace++;
                   
                }
            }
        }
        else if (state == "JOUER")
        {


            console.log(joueur.bateaux)
            pos={caseX,caseY}=(clickToCase(event.pageX-canvas.offsetLeft,event.pageY-canvas.offsetTop));//On récupère les coordonnes du clic
            if(plateau[pos.caseY][pos.caseX]!=-1){//Si la case n'a pas été déja touché
                joueur.nbtirtotal++;
                if(plateau[pos.caseY][pos.caseX]!=0){//Si il y a un bateau ->case = 1,2,3,4,5
                    //audio_explosion.play();
                    console.log("Touché!");
                    drawCase(canvas,pos.caseX,pos.caseY,"blue","red"); // On colorie en rouge le bateau touché

                    var idBateau;
                    idBateau=plateau[pos.caseY][pos.caseX];// On récupère l'id du bateau touché
                    //bateau_touche=joueur.bateaux[idBateau-1]; //On récupère le bateau correspondant dans le tableau de bateaux

                    plateau[pos.caseY][pos.caseX]=-1;//On indique que le bateau est touché dans le tableau
                    //BateauTouche(joueurTouche, caseTouchee);
                    joueur.bateaux[idBateau-1].nbTouche+=1;

                    console.log(joueur.bateaux[idBateau-1].nbTouche)
                    if(joueur.bateaux[idBateau-1].nbTouche>=joueur.bateaux[idBateau-1].taille){//Si le bateau est coulé
                        for(i=0;i<joueur.bateaux[idBateau-1].taille;i++){//On recolorie les cases en noir
                            if(joueur.bateaux[idBateau-1].sens=='H'){
                                drawCase(canvas,joueur.bateaux[idBateau-1].pos.caseX+i,joueur.bateaux[idBateau-1].pos.caseY,"blue","blue");
                            }else{
                                drawCase(canvas,joueur.bateaux[idBateau-1].pos.caseX,joueur.bateaux[idBateau-1].pos.caseY+i,"blue","blue");
                            }
                        }
                        joueur.nbcoulee++; 
                        if (joueur.nbcoulee == joueur.nbplace ) {
                            event.stopImmediatePropagation()
                            alert("gagné !");
                            if(tour="JOUEUR_1") var joueur_gagnant=joueur1;
                            else var joueur_gagnant=joueur2;
                            
                            fin_partie(joueur_gagnant);
                        }																	   

                            
                    }
                }else {//Si il n'y a pas de bateau -> Case =0 donc vide Tir loupé
                    //audio_goutte.play();
                    joueur.nbtirloupe++;
                    drawCase(canvas,pos.caseX,pos.caseY,"blue","aquamarine");
                    plateau[pos.caseY][pos.caseX]=-1
                }
                //FIN DU TOUR -> Changement de joueur
                console.log(tour)
                if(tour=="JOUEUR_2"){
                    canvas_joueur_1.style.pointerEvents="none";//On bloque le canvas 1
                    canvas_joueur_2.style.pointerEvents="auto";//On débloque le canvas 2
                    drawContour(canvas_joueur_2,"green")
                    drawContour(canvas_joueur_1,"orange")
                    tour="JOUEUR_1";
                }
                else{
                    canvas_joueur_2.style.pointerEvents="none";
                    canvas_joueur_1.style.pointerEvents="auto";
                    drawContour(canvas_joueur_1,"green")
                    drawContour(canvas_joueur_2,"orange")
                    tour="JOUEUR_2";
                }

            }
        }
    }
}

//cout plateau
function coutPlateau(plateau){
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


document.getElementById("validerj1").onmousedown  = function(event) {
    event = event || window.event;
    event.preventDefault();
    drawPlateau(canvas_joueur_1);
    document.getElementById("validerj1").setAttribute("disabled", true);
    if(autreJoueurValide==true){
        state="JOUER";
	    document.getElementById("sens").setAttribute("disabled", true);
	    buttonBateau.setAttribute("disabled", true);
        drawContour(canvas_joueur_1,"green")
        drawContour(canvas_joueur_2,"orange")
        canvas_joueur_2.style.pointerEvents="none";
    }
    else autreJoueurValide=true;
    
}
document.getElementById("validerj2").onmousedown  = function(event) {
    event = event || window.event;
    event.preventDefault();
	state="JOUER";
	document.getElementById("validerj2").setAttribute("disabled", true);
	buttonBateau.setAttribute("disabled", true);
    drawPlateau(canvas_joueur_2);
    if(autreJoueurValide==true){
        state="JOUER";
	    document.getElementById("sens").setAttribute("disabled", true);
	    buttonBateau.setAttribute("disabled", true);
        drawContour(canvas_joueur_1,"green")
        drawContour(canvas_joueur_2,"orange")
        canvas_joueur_2.style.pointerEvents="none";
    }
    else autreJoueurValide=true;
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

function fin_partie(joueur) {
	document.getElementById("scoreloupe").innerHTML = "Nombre de tir loupés : "+joueur.nbtirloupe;
	document.getElementById("scoretotal").innerHTML = "Nombre de tir totals : "+joueur.nbtirtotal;
	document.getElementById("pseudo").innerHTML = "Joueur : " + joueur.pseudo;
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
	
}




/*Les différents bateaux :
- porte avion 5 cases
- croiseur 4 cases
- contre torpilleur (3 cases)
- sous marin 3 cases
- torpilleur 2 cases
*/
