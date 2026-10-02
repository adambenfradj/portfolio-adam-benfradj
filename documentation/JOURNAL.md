1. Qu'est-ce que j'ai accompli depuis le dernier bloc ?
J'ai conçu la quasi-totalité de mon site dans Figma et j'ai beaucoup progressé dans ma façon d'utiliser l'IA et Figma pour concrétiser mon idée.
2. Quelle a été ma principale difficulté et comment je l'ai surmontée ?
Ma principale difficulté a été de traduire à l'écran l'idée que j'avais en tête : designer le site exactement comme je l'imaginais, puis l'animer. Je l'ai surmontée en simplifiant, c'est-à-dire en retirant certains éléments trop compliqués à réaliser pour me concentrer sur ce qui rendait le mieux.
3. Qu'est-ce que j'ai appris que je ne savais pas avant ?
J'ai appris plusieurs choses sur Figma, notamment des raccourcis qui me font gagner du temps. J'ai aussi découvert l'existence de Figma Make, que je n'ai pas encore utilisé mais que je compte explorer.
4. Quelle est ma prochaine étape concrète ?
Commencer à coder le site à partir de mes maquettes, et trouver comment le rendre aussi beau en version mobile qu'en version bureau.
5. Est-ce que j'ai utilisé l'IA ? Si oui, pourquoi et qu'est-ce que ça m'a appris ?
Oui. J'ai utilisé l'IA pour m'aider à formuler mes documents et à mieux organiser l'ensemble de mon travail. Ça m'a appris à structurer mes idées plus clairement et à gagner du temps dans la mise en forme, tout en gardant mes propres choix de direction artistique.



## Étape 1 — Intégration de la télé et page d'accueil « Press Start »

### 1.1 Intégrer le téléviseur (le cadre / l'écran)

Date : 27 septembre

Prompt : Mets en place un téléviseur en 16:9 qui s'adapte à l'écran, avec mon image de cadre autour, et une zone « écran » à l'intérieur où tout le contenu du site va s'afficher.

Outil : Claude

Résultat : Claude a codé la structure du téléviseur responsive (cadre + zone d'écran) avec des unités relatives au conteneur.

modifié : J'ai réajusté les marges de l'écran, la position du cadre et l'échelle pour que ça tombe pile sur mon image de télé.

### 1.2 Page d'accueil « Press Start » + transition vers le site

Date : 27 septembre

Prompt : Fais une page d'accueil dans la télé avec mon logo et un bouton « Press Start ». Quand on clique, il y a une transition (grésillement) puis on entre dans le site.

Outil : Claude

Résultat : Claude a codé l'écran de démarrage (logo + Press Start) et l'enchaînement boot → grésillement → monde au clic.

modifié : J'ai modifié la durée et le déclenchement de la transition, et replacé le logo / le texte pour que l'intro corresponde à mon ambiance.

---

## Étape 2 — Mise en page du background et animation du personnage

### 2.1 Le background qui défile

Date : 28 septembre

Prompt : Mets mon décor en fond dans la télé et fais-le défiler à l'infini quand on avance dans la page (effet de profondeur / parallaxe).

Outil : Claude

Résultat : Claude a codé le défilement du fond en boucle, plus lent que le reste, pour l'effet de profondeur.

modifié : J'ai ajusté la vitesse du parallaxe et le calage du décor pour que la répétition de l'image soit invisible et colle à ma DA.

### 2.2 L'animation du personnage à travers la page

Date : 28 septembre

Prompt : Fais avancer mon personnage dans la page avec une animation image par image en utilisant mes sprites (il « skate »), qui va plus ou moins vite selon la vitesse de défilement. 

Outil : Claude

Résultat : Claude a codé le cycle d'animation du personnage relié à la vitesse de scroll.

modifié : J'ai retravaillé la cadence des frames, la taille et la position du perso pour que le mouvement soit fluide et fidèle à mon style.

---

## Étape 3 — Mise en page des télés / projets

*(Les télés ont été faites par moi sur **Photoshop** et **Illustrator**, avec quelques retouches via l'IA de **ChatGPT** pour coller à mon style visuel. Cette étape concerne la **mise en page** de ces télés dans le code.)*

Date : 30 septembre

Prompt : Place mes télés-projets le long du parcours, toutes à la même hauteur et à la même taille, bien espacées, avec le titre du projet au-dessus de chaque télé.

Outil : Copilot (code) — visuels : Photoshop / Illustrator / ChatGPT (moi)

Résultat : Copilot a codé la disposition des télés dans le monde (alignement, espacement, titres au-dessus).

modifié : J'ai réajusté l'espacement, la taille et le cadrage de chaque télé pour qu'elles s'intègrent parfaitement au décor et à ma DA.

---

## Étape 4 — Mise en page du contact + pop-up d'information (personnage)

*(Le personnage de contact a aussi été fait / modifié par moi sur **Photoshop**, **Illustrator** et **ChatGPT**.)*

### 4.1 Mise en page du personnage de contact

Date : 1 octobre

Prompt : Place mon personnage de contact à la fin du parcours, à la même taille que le personnage principal. Il réagit quand on s'approche (il sort un flyer) et range le flyer quand on s'éloigne.

Outil : Copilot (code) — personnage : Photoshop / Illustrator / ChatGPT (moi)

Résultat : Copilot a codé le placement du personnage et l'animation pilotée par la distance (sort / range le flyer).

modifié : J'ai ajusté les seuils de distance, l'ordre des sprites et la taille pour que la réaction soit naturelle et colle à mon perso.

### 4.2 Pop-up d'information de contact

Date : 1 octobre

Prompt : Quand on clique sur le personnage de contact, ouvre une fenêtre (style Paint) avec mes informations de contact.

Outil : Claude

Résultat : Claude a codé l'ouverture / fermeture de la fenêtre de contact et sa mise en page.

modifié : J'ai retouché le style de la fenêtre et la disposition des infos pour rester dans mon univers rétro.

---

## Étape 5 — Mise en page des logiciels de compétences + animations (hover)

Date : 1 octobre

Prompt : Fais une interface façon XMB (PSP) à la fin du site avec mes icônes de logiciels alignées, le nom du logiciel sélectionné, et une animation quand on survole / sélectionne une icône (agrandissement, lueur rouge…).

Outil : Claude

Résultat : Claude a codé l'interface des logiciels (rangée d'icônes, sélection, nom affiché) avec les effets de hover / sélection et la navigation aux flèches.

modifié : J'ai ajusté l'intensité des effets (échelle, lueur), l'espacement des icônes et les couleurs pour coller à ma DA.

---

## Étape 6 — Pop-up des télés (projets) + intégration du projets.json

### 6.1 Pop-up d'information des projets

Date : 2 octobre

Prompt : Quand on clique sur une télé, ouvre une fenêtre façon Media Player Classic avec la miniature vidéo du projet, le titre, et la description du projet.

Outil : Claude

Résultat : Claude a codé la fenêtre projet (lecteur + infos) et son ouverture / fermeture au clic sur une télé.

modifié : J'ai retravaillé la mise en page de la fenêtre (vidéo, titres, textes) pour qu'elle soit lisible et fidèle à mon style.

### 6.2 Intégration du projets.json

Date : 2 octobre

Prompt : Mets le contenu des projets dans un fichier `projets.json` et fais en sorte que les télés et les pop-ups se remplissent automatiquement à partir de ce fichier.

Outil : Claude

Résultat : Claude a branché `data/projets.json` : les télés et leurs fenêtres se génèrent à partir des données (plus besoin de coder chaque projet en dur).

modifié : J'ai réorganisé / corrigé les champs du JSON et les liens pour que chaque projet s'affiche exactement comme je le voulais.

---

