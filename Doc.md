# Doc explicative du programme de la bataille navale

## Les fonctions

* drawCase(i,j,strokeColor,fillColor)

Cette fonction dessine une case. Prend en paramètre les coordonnées de la case à dessiner, la couleur du contour et la couleur de remplissage

* drawPlateau()

Cette fonction dessine le plateau de jeu. Celle-ci utilise la fonction drawCase pour dessiner les différentes cases du plateau.

* initPlateau()

Crée un tableau à deux dimensions destinés à contenir les bateaux. Il sera alimenté en parallèle de l'interface graphique. Il va servir à définir si un bateau a été touché.
