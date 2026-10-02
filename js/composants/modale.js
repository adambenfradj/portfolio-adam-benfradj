/* =================================================================
   modale.js — Ouverture / fermeture des pop-ups (modales).
   ================================================================= */

/* ---- Ouvre la modale PROJET (fenêtre Media Player Classic) ----
   Remplit le titre, la miniature et les descriptions depuis le projet. */
function ouvrirProjet(p){
  document.getElementById("mpc-fichier").textContent = p.fichier || (p.titre.toLowerCase()+".wmv");
  document.getElementById("mpc-img").src = p.media || "";
  document.getElementById("mpc-corps").innerHTML = `
    <h3>${p.titre}</h3><p class="sous">${p.sousTitre||""}</p>
    <div class="meta"><span>${p.mention||""}</span><span>${p.equipe||""}</span><span>${p.cours||""}</span><span>${p.categorie||""}</span></div>
    <div class="bloc"><h4>RÉSUMÉ</h4><p>${p.court||""}</p></div>
    <div class="bloc"><h4>CE QUE J'AI FAIT</h4><p>${p.long||""}</p></div>
    <div class="bloc"><h4>LOGICIELS</h4><p>${p.logiciels||""}</p></div>
    ${p.lien ? `<a class="lien" href="${p.lien}" target="_blank" rel="noopener">▶ ${p.lienTexte||"Voir"}</a>` : ""}`;
  document.getElementById("modale-projet").hidden = false;
}

/* ---- Ouvre la modale CONTACT (fenêtre Paint) ---- */
function ouvrirContact(){
  document.getElementById("modale-contact").hidden = false;
}

/* ---- Ferme toutes les modales ---- */
function fermerModales(){
  document.querySelectorAll(".modale").forEach(m => m.hidden = true);
}

/* ---- Branche les fermetures (bouton ✕, clic sur le fond, touche Échap) ---- */
function initModales(){
  document.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", fermerModales));
  document.querySelectorAll(".modale").forEach(m =>
    m.addEventListener("click", e => { if (e.target === m) fermerModales(); }));
  addEventListener("keydown", e => { if (e.key === "Escape") fermerModales(); });
}
