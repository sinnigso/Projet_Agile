//Initialisation des variables globales
var plateau= [];
var nbCase=10;
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
        if(plateau[pos.caseY][pos.caseX+i]==1){
            caseDispo=false;
        }
    }
    for(i=0;i<taille;i++){
        if (caseDispo==true){
            plateau[pos.caseY][pos.caseX+i]=1;//Place le bateau dans le tableau 2D
            drawCase(pos.caseX+i,pos.caseY,"blue",couleur);//Dessine le bateau
        }
    }
        return caseDispo;    
}
function tirer(){}

//Converti les click en case du tableau
function clickToCase(x,y){
    return({caseX:Math.floor(x/tailleCaseX),caseY:Math.floor(y/tailleCaseY)});
    /*for(i=0;i<5;i++){
        drawCase(caseX+i,caseY,"blue",'rgba(255, 165, 0, 250)');
    }*/
    //Affiche le contenu de la case correspondante
    //On pourra ensuite traiter le contenu s'il y a un bateau 
}

//Detection des évenements
canvas.onmousedown  = function(event) {
    if(typeof nBateau=='undefined'){
        nBateau=0;
    }
    event = event || window.event;
    event.preventDefault();
    pos={caseX,caseY}=(clickToCase(event.pageX-canvas.offsetLeft,event.pageY-canvas.offsetTop));//On récupère les coordonnes du clic
    //on place 5 bateaux
    if(nBateau<bateaux.length){
        if(placerBateau(pos,nBateau)){
            nBateau+=1;
        }
        
    }
    console.log(plateau[pos.caseY][pos.caseX])

    

    
}

/*Les différents bateaux :
- porte avion 5 cases
- croiseur 4 cases
- contre torpilleur (3 cases)
- sous marin 3 cases
- torpilleur 2 cases
*/
