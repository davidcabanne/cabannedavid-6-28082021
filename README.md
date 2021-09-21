![Image of Piiquante](https://user.oc-static.com/upload/2021/07/29/16275605596354_PiiquanteLogo.png)

# [OCRs Projet 6] Construisez une API sécurisée pour une application d'avis gastronomiques

Projet 6 du parcours Développeur web chez OCRs :  
il porte sur le développement d'une application d’évaluation des sauces piquantes pour la marque "Piiquante".  
L'objectif étant de créer un MVP permettant aux utilisateurs d’ajouter leurs sauces préférées, mais auss de "liker" / "disliker" les sauces ajoutées par les autres users.

---

### Contexte

La semaine dernière, vous avez reçu un message sur votre plateforme de freelance vous demandant de l'aide pour un nouveau projet. Les sauces piquantes sont de plus en plus populaires, en grande partie grâce à la série YouTube « Hot Ones ». C’est pourquoi ce nouveau client, la marque de condiments à base de piment Piiquante, veut développer une application web de critique des sauces piquantes appelée « Hot Takes ».

Si la responsable produit de Piiquante souhaite à terme transformer l'application d'évaluation en une boutique en ligne, elle souhaite que la première version soit une « galerie de sauces » permettant aux utilisateurs de télécharger leurs sauces piquantes préférées et de liker ou disliker les sauces que d'autres partagent. Le front-end de l'application a été développé à l'aide d'Angular et a été précompilé après des tests internes, mais Piiquante a besoin d'un développeur back-end pour construire l'API.

---

### Objectifs et Compétences évaluées

Le but est de créer le backend de l'application, le frontend étant déjà codé et fourni.

- Implémenter un modèle logique de données conformément à la réglementation
- Stocker des données de manière sécurisée
- Mettre en œuvre des opérations CRUD de manière sécurisée

### API REST

- Sécurité OWASP et RGPD

---

### Instructions & Requirements

- [requirements](https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/Requirements_DW_P6.pdf)
- [étapes clés](https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/Guide+E%CC%81tapes+Cle%CC%81s_DW_P6.pdf)

### Contenus de ce repository

Ce repo contient les deux dossiers Frontend et Backend. Vous pouvez cloner ce repository pour récupérer en local les deux parties Front et Back de l'application.

Si besoin, le Frontend est disponible séparément sur [github](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6).

---

### Installation

- Cloner ce projet depuis GitHub.

#### Faire tourner le Frontend

- `npm install` => installer les dépendencies.
- `npm start` => avoir accès au serveur de développement.

#### Faire tourner le Backend

- `npm install -g nodemon` => charger le package nodemon.
- `nodemon server` => lancer le server.
