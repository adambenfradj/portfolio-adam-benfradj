/* =================================================================
   main.js — Orchestrateur du site.
   Enchaîne : BOOT → NOISE → MONDE (scroll), anime le squelette et le
   lapin de contact, révèle la section logiciels, gère la boîte de texte.
   ================================================================= */

/* ---- Raccourcis vers les éléments ---- */
const boot   = document.getElementById("boot");
const noise  = document.getElementById("noise");
const monde  = document.getElementById("monde");
const vid    = document.getElementById("vid");
const tvBox  = document.getElementById("tv");
const objets = document.getElementById("objets");
const fond   = document.getElementById("fond");
const dialogue = document.getElementById("dialogue");
const dtext  = document.getElementById("dtext");
const cue    = document.getElementById("cue");
const prog   = document.querySelector("#prog i");
const logiciels = document.getElementById("logiciels");
const waves  = document.getElementById("waves");
const persoImg = document.getElementById("perso-img");

/* Précharge toutes les frames (évite les clignotements) */
[...FRAMES, ...CONTACT_FRAMES].forEach(s => { const i = new Image(); i.src = s; });

/* =================================================================
   1) ANIMATION DU SQUELETTE (image par image, selon la vitesse de scroll)
   ================================================================= */
let frame = 0, lastStep = 0;
function animerPerso(vitesse){
  const now = performance.now();
  const intervalle = Math.max(55, 180 - vitesse*140);  // + on va vite, + il pousse vite
  if (vitesse > 0.0015 && now - lastStep > intervalle){
    frame = (frame + 1) % FRAMES.length;
    persoImg.src = FRAMES[frame];
    lastStep = now;
  } else if (vitesse <= 0.0015){
    persoImg.src = IDLE; frame = 0;                      // à l'arrêt : debout
  }
}

/* =================================================================
   2) CONSTRUCTION DU MONDE (TV-projets + personnage de contact)
   ================================================================= */
let PROJETS = [];
let contactEl = null, contactImg = null;
const SCENE_BASE = { pos0:72, gap:46, contactGap:30 };
const SCENE_MOBILE = { pos0:74, gap:54, contactGap:38 };
let contactLeft = 262;            // position du contact (recalculée ci-dessous)

function estMobilePortrait(){
  return window.matchMedia("(max-aspect-ratio: 9/16)").matches;
}

function configScene(){
  return estMobilePortrait() ? SCENE_MOBILE : SCENE_BASE;
}

function repositionnerObjets(){
  if (!PROJETS.length) return;
  const cfg = configScene();
  const cartes = objets.querySelectorAll(".tv-projet");
  cartes.forEach((carte, i) => {
    carte.style.left = (cfg.pos0 + i*cfg.gap) + "cqw";
  });
  contactLeft = cfg.pos0 + PROJETS.length*cfg.gap + cfg.contactGap;
  if (contactEl) contactEl.style.left = contactLeft + "cqw";
  cible = Math.min(cible, MAX());
  camX = Math.min(camX, MAX());
}

async function construireMonde(){
  PROJETS = await chargerProjets();
  const cfg = configScene();

  // Une TV par projet, espacées le long de la rue
  PROJETS.forEach((p, i) => {
    const carte = creerCarteProjet(p, ouvrirProjet);
    carte.style.left = (cfg.pos0 + i*cfg.gap) + "cqw";
    objets.appendChild(carte);
  });

  // Le personnage de contact, après la dernière TV
  contactLeft = cfg.pos0 + PROJETS.length*cfg.gap + cfg.contactGap;
  contactEl = creerContact(ouvrirContact);
  contactEl.style.left = contactLeft + "cqw";
  objets.appendChild(contactEl);
  contactImg = document.getElementById("contact-img");
}

/* =================================================================
   3) ANIMATION DU LAPIN selon la DISTANCE
   Le flyer sort quand on s'approche, se range quand on s'éloigne.
   On mappe la position de l'écran du contact à une frame (0 = idle,
   ~3-4 = flyer sorti au plus proche, 7 = rangé).
   ================================================================= */
let contactFrameActuelle = -1;
function animerContact(){
  if (!contactEl || !contactImg) return;
  const tvW = tvBox.clientWidth;
  // position du centre du contact à l'écran (en px)
  const centreContact = (contactLeft/100)*tvW - camX + contactEl.offsetWidth/2;
  const d = centreContact - tvW*0.5;    // écart au centre de l'écran
  const R = tvW*0.45;                    // portée de l'animation
  let idx;
  if (d >= 0) idx = (1 - Math.min(d/R,1)) * 3.5;        // il s'approche → sort le flyer
  else        idx = 3.5 + Math.min(-d/R,1) * 3.5;       // il s'éloigne → range le flyer
  idx = Math.max(0, Math.min(7, Math.round(idx)));
  if (idx !== contactFrameActuelle){                    // on ne change l'image que si besoin
    contactFrameActuelle = idx;
    contactImg.src = CONTACT_FRAMES[idx];
  }
}

/* =================================================================
   4) SCROLL / CAMÉRA (boucle d'animation)
   ================================================================= */
let cible = 0, camX = 0, vitesse = 0, logOn = false;
const largeurTV = () => tvBox.clientWidth || window.innerWidth;
const MAX = () => largeurTV() * ((contactLeft + 95)/100);  // longueur du monde

// La molette et le tactile font avancer dans le monde
addEventListener("wheel", e => { if (monde.hidden) return;
  cible = Math.min(Math.max(cible + e.deltaY, 0), MAX()); }, { passive:true });
let ty = 0;
addEventListener("touchstart", e => { ty = e.touches[0].clientY; }, { passive:true });
addEventListener("touchmove", e => { if (monde.hidden) return;
  const dy = ty - e.touches[0].clientY; ty = e.touches[0].clientY;
  cible = Math.min(Math.max(cible + dy*2.4, 0), MAX()); }, { passive:true });

function boucle(){
  const avant = camX;
  camX += (cible - camX) * 0.09;                 // défilement lissé
  vitesse = Math.abs(camX - avant) / largeurTV();

  objets.style.transform = `translateX(${-camX}px)`;      // les objets défilent
  fond.style.backgroundPositionX = (-camX*0.5) + "px";    // le fond défile (plus lent)

  const p = camX / MAX();
  prog.style.width = (p*100) + "%";
  dialogue.classList.toggle("on", p < 0.10);
  cue.classList.toggle("off", p > 0.08);

  // Révélation de la section logiciels en fin de parcours
  const veutLog = p > 0.9;
  if (veutLog !== logOn){
    logOn = veutLog;
    logiciels.classList.toggle("on", logOn);
    logiciels.setAttribute("aria-hidden", (!logOn).toString());
    if (logOn) waves.play().catch(()=>{}); else waves.pause();
  }

  animerPerso(vitesse);
  animerContact();
  requestAnimationFrame(boucle);
}

/* =================================================================
   5) TEXTE mot par mot (façon jeu vidéo)
   ================================================================= */
let taped = false;
function taper(){
  if (taped) return; taped = true;
  const mots = DIALOGUE_TXT.split(" ");
  dtext.innerHTML = ""; dialogue.classList.add("typing");
  mots.forEach((m, i) => {
    const s = document.createElement("span");
    s.className = "w"; s.textContent = m + (i < mots.length-1 ? " " : "");
    s.style.animationDelay = (i*0.13) + "s";
    dtext.appendChild(s);
  });
  setTimeout(() => dialogue.classList.remove("typing"), mots.length*130 + 300);
}

/* =================================================================
   6) SECTION LOGICIELS (XMB) : rangée d'icônes + sélection
   ================================================================= */
const xmbRow = document.getElementById("xmbRow");
const xmbName = document.getElementById("xmbName");
let xi = 0;
LOGICIELS.forEach((l, i) => {
  const b = document.createElement("button");
  b.className = "xmb-ico" + (i === 0 ? " on" : "");
  b.innerHTML = `<img src="${l.icone}" alt="${l.nom}">`;
  b.addEventListener("mouseenter", () => selLog(i));
  b.addEventListener("focus", () => selLog(i));
  b.addEventListener("touchstart", () => selLog(i), { passive:true });
  xmbRow.appendChild(b);
});
function selLog(i){
  xi = (i + LOGICIELS.length) % LOGICIELS.length;
  [...xmbRow.children].forEach((c, k) => c.classList.toggle("on", k === xi));
  xmbName.textContent = LOGICIELS[xi].nom;
}
// Flèches ← → pour naviguer dans les logiciels
addEventListener("keydown", e => {
  if (!logOn) return;
  if (e.key === "ArrowRight") selLog(xi+1);
  if (e.key === "ArrowLeft")  selLog(xi-1);
});

/* =================================================================
   7) DÉMARRAGE : BOOT → NOISE → MONDE
   ================================================================= */
document.getElementById("btn-start").addEventListener("click", demarrer);
function demarrer(){
  boot.hidden = true; noise.hidden = false; vid.currentTime = 0;
  vid.playbackRate = 1.9;
  const pr = vid.play(); if (pr) pr.catch(finNoise);   // joue le grésillement
  vid.onended = finNoise;
  setTimeout(() => { if (!noise.hidden) finNoise(); }, 950);  // transition encore plus rapide
}
function finNoise(){
  if (noise.hidden) return;
  noise.hidden = true; monde.hidden = false;
  dialogue.classList.add("on"); taper();               // texte mot par mot
  requestAnimationFrame(boucle);
}

/* ---- Initialisation ---- */
initModales();        // branche la fermeture des pop-ups
construireMonde();    // crée les TV + le contact
addEventListener("resize", repositionnerObjets);
