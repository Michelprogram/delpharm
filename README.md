# Delpahrm
Code source du projet Delpharm, Lycée Grandmont Tours 2020-2021.<br/>
Ce projet suit l'approche Models, View, Controller (MVC) avec le Framework Express en NodeJS (Javascript).

# Fichiers et dossiers complémentaires
On retrouve les dossiers .vscode qui contient toute les extensions Visual Studio Code, le dossier node_module  contient les librairies nécessaire au développement du serveur web.<br/>
Dans le dossier Test on retrouve tous les tests éffectué durant le développement avant l'intégremment au serveur web.<br/>
Le fichier .gitignore est un fichier répertoriant tous les fichiers à éviter de push durant les commits.<br/>
Les fichiers package-lock.json et package.json sont en rapport avec les modules et librairies installer.<br/>

# server.js
Fichier qui lance le server et qui fais le lien entre tous les dossiers.

# PDF
Le dossier PDF contient le rapport qui a été créé avant l'impression.

# Balance
Dans ce dossier on trouve un fichier balance.js qui gère le lien entre la balance et le serveur.

# config
Dossier contenant la configuration du server web et la base de donnée.

# Controllers
Le dossier controllers contient plusieurs fichiers comme api.js, balance.js, error_page.js, home.js, impression.js<br/>
Chaque fichier contient des méthodes spécifiques en fonctions des différentes routes.

# Models
Le dossier models concerne tous les liens à la base de données.<br/>
Le fichier db.js crée la connexion à la base de données.<br/>
Les autres fichiers controleur.models.js, produit.model.js, rapport.model.js sont des Objets réspectif avec leur méthode différente pour faire des requêtes à la base de données.<br/>

#

