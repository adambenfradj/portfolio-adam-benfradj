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
    mpcToggle.textContent = mpcVideo.paused ? "▶" : "⏸";
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
  mpcVideo.onended = () => { mpcToggle.textContent = "▶"; };
}

/* ---- Ouvre la modale PROJET (fenêtre Media Player Classic) ----
   Remplit le titre, la miniature et les descriptions depuis le projet. */
function ouvrirProjet(p){
  document.getElementById("mpc-fichier").textContent = p.fichier || (p.titre.toLowerCase()+".wmv");
  document.getElementById("mpc-corps").innerHTML = `
    <h3>${p.titre}</h3><p class="sous">${p.sousTitre||""}</p>
    <div class="meta"><span>${p.mention||""}</span><span>${p.equipe||""}</span><span>${p.cours||""}</span><span>${p.categorie||""}</span></div>
    <div class="bloc"><h4>RÉSUMÉ</h4><p>${p.court||""}</p></div>
    <div class="bloc"><h4>CE QUE J'AI FAIT</h4><p>${p.long||""}</p></div>
    <div class="bloc"><h4>LOGICIELS</h4><p>${p.logiciels||""}</p></div>
    ${p.lien ? `<a class="lien" href="${p.lien}" target="_blank" rel="noopener">▶ ${p.lienTexte||"Voir"}</a>` : ""}`;
  preparerLecteur(p);
  document.getElementById("modale-projet").hidden = false;
}

/* ---- Ouvre la modale CONTACT (fenêtre Paint) ---- */
function ouvrirContact(){
  document.getElementById("modale-contact").hidden = false;
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

  if (mpcToggle) {
    mpcToggle.addEventListener("click", () => {
      if (!mpcVideo) return;
      if (mpcVideo.paused) mpcVideo.play().catch(() => {});
      else mpcVideo.pause();
      majLecteur();
    });
  }

  if (mpcRange) {
    mpcRange.addEventListener("input", e => {
      if (!mpcVideo || !Number.isFinite(mpcVideo.duration) || mpcVideo.duration <= 0) return;
      mpcVideo.currentTime = (Number(e.target.value) / 100) * mpcVideo.duration;
      majLecteur();
    });
  }
}
