# Delpahrm
Code source du projet Delpharm, Lycée Grandmont Tours 2020-2021.<br/>
Ce projet suit l'approche Models, View, Controller (MVC) avec le Framework Express en NodeJS (Javascript).

# Fichiers et dossiers complémentaires
On retrouve les dossiers .vscode qui contient toutes les extensions Visual Studio Code, le dossier node_module  contient les librairies nécessaires au développement du serveur web.<br/>
Dans le dossier Test on retrouve tous les tests éffectués durant le développement avant de l'intégrer au serveur web.<br/>
Le fichier .gitignore est un fichier répertoriant tous les fichiers à éviter de push durant le développement.<br/>
Les fichiers package-lock.json et package.json sont en rapport avec les modules et librairies installé.<br/>

# server.js
Fichier qui lance le server et qui fais le lien entre tous les dossiers.

# PDF
Le dossier PDF contient le rapport qui a été créé avant l'impression.

# Balance
Dans ce dossier on trouve un fichier balance.js qui gère le lien entre la balance et le serveur.

# config
Dossier contenant la configuration du server web et la base de données.

# Controllers
Le dossier controllers contient plusieurs fichiers comme api.js, balance.js, error_page.js, home.js, impression.js<br/>
Chaque fichier contient des méthodes spécifiques en fonctions des différentes routes.

# Models
Le dossier models concerne tous les liens à la base de données.<br/>
Le fichier db.js crée la connexion à la base de données.<br/>
Les autres fichiers controleur.models.js, produit.model.js, rapport.model.js sont des Objets réspectif avec leur méthode différente pour faire des requêtes à la base de données.<br/>

# Public
Le dossier public est le contenu vu par l'utilisateur, c'est-à-dire les images, l'HTML qui est la structure de la page, Javascript pour le dynamisme de la page et le CSS pour le style du site.<br/>

# Routes
Il contient toutes les routes (chemin) disponible sur le serveur.

# Toolbox
Ce dossier contient la classe tCalcul, qui s'occupe de calculer la variation, conformité et de formater la date.<br/>
On y retrouve aussi tous les patterns de regex dans regex.js.

# Views
Dans ce dossier on retrouve deux répertoire home et page_404, dans lesquels il y a le code HTML respectif de chacun.

