/* =================================================================
   data.js — Toutes les DONNÉES du site centralisées ici.
   (Chargé en premier : les autres scripts utilisent ces variables.)
   ================================================================= */

/* ---- Frames du SQUELETTE (ordre exact du cycle de skate) ---- */
const FRAMES = [
  "assets/images/debout.png",
  "assets/images/pousse_pied_sol.png",
  "assets/images/pousse_pied_air.png",
  "assets/images/pied_semi_planche.png",
  "assets/images/accroupi.png",
  "assets/images/semi_debout.png",
  "assets/images/semi_accroupi.png"
];
const IDLE = FRAMES[0];                 // image à l'arrêt

/* ---- Frames du LAPIN de contact (1 = idle → 4 = flyer sorti → 8 = rangé) ---- */
const CONTACT_FRAMES = [
  "assets/images/contact_1.png","assets/images/contact_2.png",
  "assets/images/contact_3.png","assets/images/contact_4.png",
  "assets/images/contact_5.png","assets/images/contact_6.png",
  "assets/images/contact_7.png","assets/images/contact_8.png"
];

/* ---- Logiciels (ordre de l'interface XMB) ---- */
const LOGICIELS = [
  {nom:"Maya",               icone:"assets/images/maya.png"},
  {nom:"Touch Designer",     icone:"assets/images/touchdesigner.png"},
  {nom:"Visual Studio Code", icone:"assets/images/visualcode.png"},
  {nom:"GitHub",             icone:"assets/images/github.png"},
  {nom:"Unity",              icone:"assets/images/unity.png"},
  {nom:"Godot",              icone:"assets/images/godot.png"},
  {nom:"DaVinci Resolve",    icone:"assets/images/davinci.png"}
];

/* ---- Rectangle de l'ÉCRAN (trou) de chaque TV, en % de l'image ----
   Mesuré automatiquement sur chaque PNG (zone transparente centrale).
   Sert à placer le grésillement pile dans l'écran. */
const ECRANS = {
  "minitv_1.png":{x:15.4,y:28.1,w:54.1,h:41.8},
  "minitv_2.png":{x:15.0,y:15.5,w:69.7,h:53.3},
  "minitv_3.png":{x:9.5, y:23.2,w:61.5,h:50.4},
  "minitv_4.png":{x:14.2,y:37.8,w:56.3,h:46.2}
};
function rectEcran(tvPath){
  const nom = tvPath.split("/").pop();
  return ECRANS[nom] || {x:15,y:20,w:60,h:55};   // valeur de secours
}

/* ---- Texte de la boîte de dialogue (écrit mot par mot) ---- */
const DIALOGUE_TXT = "Défilez pour avancer… projets, contact, puis mes logiciels.";

/* ---- Chargement des projets depuis data/projet.json ---- */
async function chargerProjets(){
  try{
    const rep = await fetch("data/projet.json");
    return await rep.json();
  }catch(e){
    console.error("data/projet.json introuvable — ouvrez le site via Live Server.", e);
    return [];
  }
}
