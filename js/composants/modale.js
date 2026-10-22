/* =================================================================
   modale.js — Ouverture / fermeture des pop-ups (modales).
   ================================================================= */

const mpcVideo = document.getElementById("mpc-video");
const mpcRange = document.getElementById("mpc-range");
const mpcTime = document.getElementById("mpc-time");
const mpcToggle = document.querySelector('[data-action="toggle"]');

function formatTime(seconds){
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function majLecteur(){
  if (!mpcVideo || !mpcRange || !mpcTime) return;
  const duration = Number.isFinite(mpcVideo.duration) ? mpcVideo.duration : 0;
  const current = Number.isFinite(mpcVideo.currentTime) ? mpcVideo.currentTime : 0;

  if (duration > 0) {
    const pct = (current / duration) * 100;
    mpcRange.value = pct;
    mpcTime.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
  } else {
    mpcRange.value = 0;
    mpcTime.textContent = "00:00 / 00:00";
  }

  if (mpcToggle){
    mpcToggle.textContent = mpcVideo.paused ? "PLAY" : "PAUSE";
  }
}

function preparerLecteur(p){
  if (!mpcVideo) return;
  const source = p.video || p.media || "assets/videos/tvnoise.mp4";
  mpcVideo.src = source;
  mpcVideo.load();
  mpcVideo.currentTime = 0;
  mpcVideo.muted = false;
  mpcVideo.playsInline = true;
  mpcVideo.play().catch(() => {});
  mpcVideo.onloadedmetadata = majLecteur;
  mpcVideo.ontimeupdate = majLecteur;
  mpcVideo.onended = () => { if (mpcToggle) mpcToggle.textContent = "PLAY"; };
}

/* ---- Ouvre la modale PROJET (fenêtre Media Player Classic) ----
   Remplit le titre, la miniature, les descriptions et le processus de création. */
function ouvrirProjet(p){
  document.getElementById("mpc-fichier").textContent = p.fichier || (p.titre.toLowerCase()+".wmv");
  document.getElementById("mpc-corps").innerHTML = `
    <h3>${p.titre}</h3><p class="sous">${p.sousTitre||""}</p>
    <div class="meta"><span>${p.mention||""}</span><span>${p.equipe||""}</span><span>${p.cours||""}</span><span>${p.categorie||""}</span></div>
    <div class="bloc"><h4>RÉSUMÉ</h4><p>${p.court||""}</p></div>
    <div class="bloc"><h4>CE QUE J'AI FAIT</h4><p>${p.long||""}</p></div>
    <div class="bloc"><h4>LOGICIELS</h4><p>${p.logiciels||""}</p></div>
    ${(p.processus && p.processus.length) ? `
      <div class="bloc proc-titre"><h4>PROCESSUS DE CRÉATION</h4></div>
      ${p.processus.map((e, i) => `
        <div class="proc-etape">
          <h5><span class="proc-num">${String(i + 1).padStart(2, "0")}</span>${e.titre}</h5>
          ${e.texte ? `<p>${e.texte}</p>` : ""}
          ${e.citation ? `<blockquote class="proc-cite">${e.citation}</blockquote>` : ""}
          ${(e.images && e.images.length) ? `<div class="proc-imgs">${e.images.map(src => `<img src="${src}" alt="${e.titre}" loading="lazy">`).join("")}</div>` : ""}
        </div>`).join("")}
    ` : ""}
    ${p.lien ? `<a class="lien" href="${p.lien}" target="_blank" rel="noopener">${p.lienTexte || "Voir l'expérience"}</a>` : ""}`;
  preparerLecteur(p);
  document.getElementById("modale-projet").hidden = false;
}

/* ---- Texte « À propos » (écrit mot par mot dans la zone vide de la fenêtre Paint) ---- */
const APROPOS_TXT = "Je suis Adam Ben Fradj, étudiant en intégration multimédia. Ce qui me caractérise avant tout, c'est ma créativité : j'aime partir d'une idée et la développer jusqu'au bout en lui donnant une direction artistique affirmée. J'ai le goût d'innover, d'explorer de nouvelles approches plutôt que de reprendre ce qui existe déjà. Je travaille sur plusieurs plans — la 3D, l'animation, le graphisme, le jeu vidéo et le montage — et cette polyvalence me permet de m'adapter à chaque projet et de lui donner une identité qui lui est propre.";

let aproposToken = 0;   // invalide l'ancienne animation si on rouvre la modale
function taperApropos(){
  const cible = document.getElementById("apropos-text");
  if (!cible) return;
  const mon = ++aproposToken;
  cible.innerHTML = "";
  const mots = APROPOS_TXT.split(" ");
  let i = 0;
  (function suivant(){
    if (mon !== aproposToken) return;          // une nouvelle ouverture a pris le relais
    const s = document.createElement("span");
    s.className = "w";                          // même effet d'apparition que la box d'intro
    s.textContent = mots[i] + (i < mots.length - 1 ? " " : "");
    cible.appendChild(s);
    i += 1;
    if (i < mots.length) setTimeout(suivant, 75);
  })();
}

/* ---- Ouvre la modale CONTACT (fenêtre Paint) ---- */
function ouvrirContact(){
  document.getElementById("modale-contact").hidden = false;
  taperApropos();                              // (re)lance l'écriture du texte À propos
}

/* ---- Ouvre la modale CONTACTER (mini fenêtre courriel + téléphone) ---- */
function ouvrirCoord(){
  document.getElementById("modale-coord").hidden = false;
}

/* ---- Copie dans le presse-papier + petit retour visuel « Copié ! » ---- */
function fallbackCopier(txt){
  const ta = document.createElement("textarea");
  ta.value = txt; ta.style.position = "fixed"; ta.style.top = "-9999px"; ta.style.opacity = "0";
  document.body.appendChild(ta); ta.focus(); ta.select();
  try { document.execCommand("copy"); } catch (e) {}
  document.body.removeChild(ta);
}
function copier(txt, btn){
  const fini = () => {
    if (!btn) return;
    const et = btn.querySelector(".coord-state");
    const old = btn.dataset.label || (et ? et.textContent : "");
    btn.dataset.label = old;
    btn.classList.add("ok");
    if (et) et.textContent = "Copié !";
    clearTimeout(btn._t);
    btn._t = setTimeout(() => { btn.classList.remove("ok"); if (et) et.textContent = old; }, 1600);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(txt).then(fini).catch(() => { fallbackCopier(txt); fini(); });
  } else {
    fallbackCopier(txt); fini();
  }
}

/* ---- Ferme toutes les modales ---- */
function fermerModales(){
  document.querySelectorAll(".modale").forEach(m => m.hidden = true);
  if (mpcVideo) {
    mpcVideo.pause();
    mpcVideo.currentTime = 0;
  }
}

/* ---- Branche les fermetures (bouton ✕, clic sur le fond, touche Échap) ---- */
function initModales(){
  document.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", fermerModales));
  document.querySelectorAll(".modale").forEach(m =>
    m.addEventListener("click", e => { if (e.target === m) fermerModales(); }));
  addEventListener("keydown", e => { if (e.key === "Escape") fermerModales(); });

  // Boutons « copier » (courriel / téléphone) de la fenêtre CONTACTER
  document.querySelectorAll("[data-copy]").forEach(b =>
    b.addEventListener("click", e => copier(e.currentTarget.getAttribute("data-copy"), e.currentTarget)));

  if (mpcToggle) {
    mpcToggle.addEventListener("click", () => {
      if (!mpcVideo) return;
      if (mpcVideo.paused) mpcVideo.play().catch(() => {});
      else mpcVideo.pause();
      majLecteur();
    });
  }

  document.querySelectorAll(".mpc-btn[data-action='prev']").forEach(btn => {
    btn.addEventListener("click", () => {
      if (!mpcVideo || !Number.isFinite(mpcVideo.duration)) return;
      mpcVideo.currentTime = Math.max(0, mpcVideo.currentTime - 5);
      majLecteur();
    });
  });

  document.querySelectorAll(".mpc-btn[data-action='next']").forEach(btn => {
    btn.addEventListener("click", () => {
      if (!mpcVideo || !Number.isFinite(mpcVideo.duration)) return;
      mpcVideo.currentTime = Math.min(mpcVideo.duration, mpcVideo.currentTime + 5);
      majLecteur();
    });
  });

  if (mpcRange) {
    mpcRange.addEventListener("input", e => {
      if (!mpcVideo || !Number.isFinite(mpcVideo.duration) || mpcVideo.duration <= 0) return;
      mpcVideo.currentTime = (Number(e.target.value) / 100) * mpcVideo.duration;
      majLecteur();
    });
  }
}